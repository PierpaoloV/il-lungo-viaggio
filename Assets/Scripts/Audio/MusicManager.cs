using System.Collections;
using UnityEngine;

namespace IlLungoViaggio
{
    /// <summary>
    /// Manages background music playback and dream-mood transitions.
    /// Add to a persistent GameObject (DontDestroyOnLoad recommended).
    /// </summary>
    public class MusicManager : MonoBehaviour
    {
        // ── tuneable constants ───────────────────────────────────────────────
        private const string ClipPath       = "audio/il-lungo-viaggio-theme";
        private const float  DefaultVolume  = 0.24f;  // mirrors TS DEFAULT_VOLUME
        private const float  DefaultPitch   = 1.0f;
        private const float  DreamVolume    = 0.18f;  // ~0.75× default → colder feel
        private const float  DreamPitch     = 0.85f;  // slightly lower, tenser
        private const float  FadeInDur      = 1.5f;   // seconds
        private const float  FadeOutDur     = 1.2f;
        private const float  MoodLerpDur    = 1.0f;

        // ── state ────────────────────────────────────────────────────────────
        private AudioSource  _source;
        private Coroutine    _fadeCoroutine;
        private Coroutine    _moodCoroutine;
        private bool         _dreamMoodActive;

        // ── Unity lifecycle ──────────────────────────────────────────────────
        private void Awake()
        {
            // Build AudioSource at runtime — no Inspector dependency.
            _source             = gameObject.AddComponent<AudioSource>();
            _source.loop        = true;
            _source.playOnAwake = false;
            _source.volume      = 0f;
            _source.pitch       = DefaultPitch;

            AudioClip clip = Resources.Load<AudioClip>(ClipPath);
            if (clip == null)
            {
                Debug.LogError($"[MusicManager] Clip not found at Resources/{ClipPath}");
                return;
            }
            _source.clip = clip;
        }

        // ── public API ───────────────────────────────────────────────────────

        /// <summary>Start playback with a fade-in. Safe to call while already playing.</summary>
        public void PlayTheme()
        {
            if (_source == null || _source.clip == null) return;

            InterruptFade();

            float targetVolume = _dreamMoodActive ? DreamVolume : DefaultVolume;

            if (!_source.isPlaying)
            {
                _source.volume = 0f;
                _source.Play();
            }

            _fadeCoroutine = StartCoroutine(FadeVolume(_source.volume, targetVolume, FadeInDur));
        }

        /// <summary>Fade out and stop playback. Safe to call while stopped.</summary>
        public void StopTheme()
        {
            if (_source == null) return;

            InterruptFade();

            if (_source.isPlaying)
                _fadeCoroutine = StartCoroutine(FadeOutAndStop());
        }

        /// <summary>
        /// Switch between normal and dream mood.
        /// Dream mood: lower volume + slightly lower pitch (colder, tenser).
        /// Transition is smooth (lerp over <see cref="MoodLerpDur"/> seconds).
        /// </summary>
        public void SetDreamMood(bool on)
        {
            if (_dreamMoodActive == on) return;
            _dreamMoodActive = on;

            if (_moodCoroutine != null) StopCoroutine(_moodCoroutine);
            _moodCoroutine = StartCoroutine(LerpMood(
                fromVolume: _source.volume,
                toVolume:   on ? DreamVolume : DefaultVolume,
                fromPitch:  _source.pitch,
                toPitch:    on ? DreamPitch  : DefaultPitch,
                duration:   MoodLerpDur
            ));
        }

        // ── coroutines ───────────────────────────────────────────────────────

        private IEnumerator FadeVolume(float from, float to, float duration)
        {
            float elapsed = 0f;
            while (elapsed < duration)
            {
                elapsed      += Time.unscaledDeltaTime;
                _source.volume = Mathf.Lerp(from, to, elapsed / duration);
                yield return null;
            }
            _source.volume = to;
            _fadeCoroutine = null;
        }

        private IEnumerator FadeOutAndStop()
        {
            float startVol = _source.volume;
            float elapsed  = 0f;
            while (elapsed < FadeOutDur)
            {
                elapsed        += Time.unscaledDeltaTime;
                _source.volume  = Mathf.Lerp(startVol, 0f, elapsed / FadeOutDur);
                yield return null;
            }
            _source.volume = 0f;
            _source.Stop();
            _fadeCoroutine = null;
        }

        private IEnumerator LerpMood(
            float fromVolume, float toVolume,
            float fromPitch,  float toPitch,
            float duration)
        {
            float elapsed = 0f;
            while (elapsed < duration)
            {
                elapsed        += Time.unscaledDeltaTime;
                float t         = elapsed / duration;
                _source.volume  = Mathf.Lerp(fromVolume, toVolume, t);
                _source.pitch   = Mathf.Lerp(fromPitch,  toPitch,  t);
                yield return null;
            }
            _source.volume = toVolume;
            _source.pitch  = toPitch;
            _moodCoroutine = null;
        }

        // ── helpers ──────────────────────────────────────────────────────────

        /// <summary>Cancel any in-progress volume fade without stopping playback.</summary>
        private void InterruptFade()
        {
            if (_fadeCoroutine != null)
            {
                StopCoroutine(_fadeCoroutine);
                _fadeCoroutine = null;
            }
        }
    }
}
