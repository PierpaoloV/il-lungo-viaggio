using UnityEngine;

namespace IlLungoViaggio
{
    /// <summary>
    /// Animazione di camminata PROCEDURALE per uno sprite singolo (nessun
    /// sprite-sheet, nessun rig). Va messo sul figlio "Body" che contiene lo
    /// SpriteRenderer; legge lo stato di movimento dal PlayerController2D del
    /// genitore.
    ///
    /// Mentre Ernesto cammina: rimbalzo verticale (bob), dondolio (sway) e
    /// leggera respirazione da fermo. È un segnaposto credibile finché non si
    /// passa al rig a pezzi (cutout) stile Pentiment.
    /// </summary>
    [RequireComponent(typeof(SpriteRenderer))]
    public class CharacterAnimator2D : MonoBehaviour
    {
        [Tooltip("Altezza del corpo in unità mondo (per scalare le ampiezze).")]
        public float referenceHeight = 3f;

        [Header("Camminata")]
        [Tooltip("Ampiezza rimbalzo come frazione dell'altezza.")]
        public float bobFraction = 0.03f;
        public float stepFrequency = 9f;
        [Tooltip("Dondolio in gradi.")]
        public float swayAngle = 3.5f;
        [Tooltip("Schiacciamento/allungamento come frazione.")]
        public float squashFraction = 0.04f;

        [Header("Idle (respiro)")]
        public float idleBreathFraction = 0.006f;
        public float idleFrequency = 1.6f;

        PlayerController2D _ctrl;
        Vector3 _baseLocalPos;
        Vector3 _baseScale;
        float _phase;
        float _walkAmount; // 0 fermo, 1 in cammino

        void Start()
        {
            _ctrl = GetComponentInParent<PlayerController2D>();
            _baseLocalPos = transform.localPosition;
            _baseScale = transform.localScale;
        }

        void Update()
        {
            bool moving = _ctrl != null && _ctrl.IsMoving;
            _walkAmount = Mathf.MoveTowards(_walkAmount, moving ? 1f : 0f,
                Time.deltaTime * 6f);

            if (moving) _phase += Time.deltaTime * stepFrequency;
            else _phase += Time.deltaTime * idleFrequency;

            float bobAmp = bobFraction * referenceHeight;

            // Bounce: |sin| dà due rimbalzi per ciclo (un passo per gamba).
            float bob = Mathf.Abs(Mathf.Sin(_phase)) * bobAmp * _walkAmount;
            float sway = Mathf.Sin(_phase) * swayAngle * _walkAmount;
            float squash = Mathf.Sin(_phase * 2f) * squashFraction * _walkAmount;

            // Respiro da fermo (subentra quando _walkAmount -> 0).
            float idle = Mathf.Sin(_phase) * idleBreathFraction * referenceHeight
                         * (1f - _walkAmount);

            transform.localPosition = _baseLocalPos + new Vector3(0f, bob + idle, 0f);
            transform.localRotation = Quaternion.Euler(0f, 0f, sway);
            transform.localScale = new Vector3(
                _baseScale.x * (1f - squash),
                _baseScale.y * (1f + squash),
                _baseScale.z);
        }
    }
}
