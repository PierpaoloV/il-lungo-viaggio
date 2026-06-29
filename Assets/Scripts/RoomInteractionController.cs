using System.Collections;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

namespace IlLungoViaggio
{
    /// <summary>
    /// Interazioni contestuali della stanza del risveglio. Il letto apre la
    /// scelta di dormire e ricarica la scena dietro una dissolvenza; la spada
    /// apre l'azione Esamina e mostra una nuvoletta descrittiva.
    /// </summary>
    [DisallowMultipleComponent]
    public class RoomInteractionController : MonoBehaviour
    {
        public enum HotspotKind
        {
            Bed,
            Sword
        }

        static readonly Color Parchment = new Color(0.93f, 0.87f, 0.72f, 0.98f);
        static readonly Color Ink = new Color(0.18f, 0.13f, 0.09f, 1f);
        static readonly Color ButtonColor = new Color(0.30f, 0.20f, 0.12f, 0.98f);
        static bool _returningFromSleep;

        PlayerController2D _player;
        Font _font;
        Canvas _canvas;
        RectTransform _canvasRect;

        GameObject _modal;
        Text _modalTitle;
        Text _modalPrompt;
        Button _primaryButton;
        Button _secondaryButton;
        Text _primaryLabel;
        Text _secondaryLabel;

        GameObject _speechBubble;
        RectTransform _tooltip;
        CanvasGroup _tooltipGroup;
        Text _tooltipText;

        GameObject _transition;
        CanvasGroup _transitionGroup;
        Text _transitionText;
        bool _transitioning;

        public bool IsInteractionBlocked => _transitioning
            || (_modal != null && _modal.activeSelf);

        public void Initialize(Vector2 roomSize, PlayerController2D player)
        {
            _player = player;
            _font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf")
                    ?? Resources.GetBuiltinResource<Font>("Arial.ttf");

            EnsureEventSystem();
            BuildCanvas();
            CreateHotspots(roomSize);

            if (_returningFromSleep)
            {
                _returningFromSleep = false;
                StartCoroutine(RevealNewDay());
            }
            else
            {
                _transition.SetActive(false);
            }
        }

        void Update()
        {
            if (!Input.GetKeyDown(KeyCode.Escape) || _transitioning) return;

            if (_modal.activeSelf) CloseModal();
            else if (_speechBubble.activeSelf) _speechBubble.SetActive(false);
        }

        // ---- Hotspot ----------------------------------------------------

        void CreateHotspots(Vector2 roomSize)
        {
            // Coordinate normalizzate rispetto all'illustrazione scene-bg.
            // Sono volutamente un po' più ampie dei contorni dipinti, così il
            // click resta comodo anche su schermi piccoli.
            CreateHotspot("BedHotspot", HotspotKind.Bed, "Letto",
                new Rect(0.035f, 0.255f, 0.40f, 0.34f), roomSize);
            CreateHotspot("SwordHotspot", HotspotKind.Sword, "Spada",
                new Rect(0.895f, 0.265f, 0.09f, 0.27f), roomSize);
        }

        void CreateHotspot(string objectName, HotspotKind kind, string label,
            Rect normalizedRect, Vector2 roomSize)
        {
            Vector2 center = new Vector2(
                (normalizedRect.center.x - 0.5f) * roomSize.x,
                (normalizedRect.center.y - 0.5f) * roomSize.y);
            Vector2 size = Vector2.Scale(normalizedRect.size, roomSize);

            var go = new GameObject(objectName, typeof(BoxCollider2D),
                typeof(RoomHotspot));
            go.transform.SetParent(transform, false);
            go.transform.position = new Vector3(center.x, center.y, 0f);
            go.GetComponent<RoomHotspot>().Configure(this, kind, label, size);
        }

        public void SetHotspotHover(string label, Vector3 worldPosition)
        {
            if (IsInteractionBlocked) return;

            _tooltipText.text = label;
            _tooltipGroup.alpha = 1f;

            Vector2 screen = Camera.main != null
                ? (Vector2)Camera.main.WorldToScreenPoint(worldPosition)
                : (Vector2)Input.mousePosition;
            RectTransformUtility.ScreenPointToLocalPointInRectangle(
                _canvasRect, screen, null, out Vector2 local);

            float halfWidth = _canvasRect.rect.width * 0.5f;
            float halfHeight = _canvasRect.rect.height * 0.5f;
            local.x = Mathf.Clamp(local.x, -halfWidth + 80f, halfWidth - 80f);
            local.y = Mathf.Clamp(local.y + 46f,
                -halfHeight + 28f, halfHeight - 28f);
            _tooltip.anchoredPosition = local;
        }

        public void ClearHotspotHover()
        {
            if (_tooltipGroup != null) _tooltipGroup.alpha = 0f;
        }

        public void SelectHotspot(HotspotKind kind)
        {
            if (IsInteractionBlocked) return;

            ClearHotspotHover();
            _speechBubble.SetActive(false);
            if (kind == HotspotKind.Bed) ShowBedActions();
            else ShowSwordActions();
        }

        // ---- Azioni -----------------------------------------------------

        void ShowBedActions()
        {
            ShowModal("Il letto", "Vuoi riposare fino a domani?",
                "Dormi", Sleep, "Annulla", CloseModal);
        }

        void ShowSwordActions()
        {
            ShowModal("La spada di legno", "Cosa vuoi fare?",
                "Esamina", ExamineSword, "Lascia stare", CloseModal);
        }

        void ExamineSword()
        {
            CloseModal();
            _speechBubble.SetActive(true);
        }

        void Sleep()
        {
            if (_transitioning) return;
            CloseModal();
            StartCoroutine(SleepTransition());
        }

        IEnumerator SleepTransition()
        {
            _transitioning = true;
            SetPlayerEnabled(false);
            _speechBubble.SetActive(false);
            ClearHotspotHover();

            _transitionText.text = "Il giorno seguente";
            _transition.SetActive(true);
            _transitionGroup.alpha = 0f;
            _transitionGroup.blocksRaycasts = true;
            yield return FadeTransition(0f, 1f, 0.85f);
            yield return new WaitForSecondsRealtime(0.75f);

            _returningFromSleep = true;
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }

        IEnumerator RevealNewDay()
        {
            _transitioning = true;
            SetPlayerEnabled(false);
            _transitionText.text = "Un nuovo giorno";
            _transition.SetActive(true);
            _transitionGroup.alpha = 1f;
            _transitionGroup.blocksRaycasts = true;

            yield return new WaitForSecondsRealtime(0.35f);
            yield return FadeTransition(1f, 0f, 1f);

            _transitionGroup.blocksRaycasts = false;
            _transition.SetActive(false);
            _transitioning = false;
            SetPlayerEnabled(true);
        }

        IEnumerator FadeTransition(float from, float to, float duration)
        {
            float elapsed = 0f;
            while (elapsed < duration)
            {
                elapsed += Time.unscaledDeltaTime;
                _transitionGroup.alpha = Mathf.Lerp(from, to,
                    Mathf.Clamp01(elapsed / duration));
                yield return null;
            }
            _transitionGroup.alpha = to;
        }

        // ---- UI ---------------------------------------------------------

        void BuildCanvas()
        {
            var canvasGo = new GameObject("RoomInteractionCanvas",
                typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGo.transform.SetParent(transform, false);
            _canvas = canvasGo.GetComponent<Canvas>();
            _canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            _canvas.sortingOrder = 100;

            var scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1280f, 720f);
            scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
            scaler.matchWidthOrHeight = 0.5f;
            _canvasRect = (RectTransform)canvasGo.transform;

            BuildTooltip(canvasGo.transform);
            BuildModal(canvasGo.transform);
            BuildSpeechBubble(canvasGo.transform);
            BuildTransition(canvasGo.transform);
        }

        void BuildTooltip(Transform parent)
        {
            var go = new GameObject("HotspotTooltip", typeof(Image),
                typeof(CanvasGroup));
            go.transform.SetParent(parent, false);
            _tooltip = (RectTransform)go.transform;
            _tooltip.anchorMin = _tooltip.anchorMax = new Vector2(0.5f, 0.5f);
            _tooltip.pivot = new Vector2(0.5f, 0.5f);
            _tooltip.sizeDelta = new Vector2(112f, 34f);
            go.GetComponent<Image>().color = new Color(0.12f, 0.08f, 0.05f, 0.88f);
            go.GetComponent<Image>().raycastTarget = false;
            _tooltipGroup = go.GetComponent<CanvasGroup>();
            _tooltipGroup.alpha = 0f;
            _tooltipGroup.blocksRaycasts = false;
            _tooltipGroup.interactable = false;

            _tooltipText = MakeText(go.transform, "Label", "", 18,
                new Color(0.96f, 0.90f, 0.76f));
            Stretch(_tooltipText.rectTransform, 8f, 8f, 2f, 2f);
            _tooltipText.alignment = TextAnchor.MiddleCenter;
            _tooltipText.raycastTarget = false;
        }

        void BuildModal(Transform parent)
        {
            _modal = new GameObject("ActionModal", typeof(RectTransform));
            _modal.transform.SetParent(parent, false);
            Stretch((RectTransform)_modal.transform);

            var scrim = new GameObject("Scrim", typeof(Image), typeof(Button));
            scrim.transform.SetParent(_modal.transform, false);
            Stretch((RectTransform)scrim.transform);
            scrim.GetComponent<Image>().color = new Color(0f, 0f, 0f, 0.30f);
            scrim.GetComponent<Button>().onClick.AddListener(CloseModal);

            var panel = new GameObject("Panel", typeof(Image));
            panel.transform.SetParent(_modal.transform, false);
            panel.GetComponent<Image>().color = Parchment;
            var panelRt = (RectTransform)panel.transform;
            panelRt.anchorMin = panelRt.anchorMax = new Vector2(0.5f, 0f);
            panelRt.pivot = new Vector2(0.5f, 0f);
            panelRt.anchoredPosition = new Vector2(0f, 42f);
            panelRt.sizeDelta = new Vector2(570f, 190f);

            _modalTitle = MakeText(panel.transform, "Title", "", 28, Ink);
            SetRect(_modalTitle.rectTransform, new Vector2(24f, -58f),
                new Vector2(-24f, -18f));
            _modalTitle.alignment = TextAnchor.MiddleLeft;
            _modalTitle.fontStyle = FontStyle.Bold;

            _modalPrompt = MakeText(panel.transform, "Prompt", "", 21, Ink);
            SetRect(_modalPrompt.rectTransform, new Vector2(24f, -104f),
                new Vector2(-24f, -62f));
            _modalPrompt.alignment = TextAnchor.UpperLeft;

            _primaryButton = MakeButton(panel.transform, "PrimaryAction",
                new Vector2(-126f, 24f), out _primaryLabel);
            _secondaryButton = MakeButton(panel.transform, "SecondaryAction",
                new Vector2(126f, 24f), out _secondaryLabel);
            _modal.SetActive(false);
        }

        void BuildSpeechBubble(Transform parent)
        {
            _speechBubble = new GameObject("SwordDescription",
                typeof(RectTransform));
            _speechBubble.transform.SetParent(parent, false);
            var root = (RectTransform)_speechBubble.transform;
            root.anchorMin = root.anchorMax = new Vector2(0.77f, 0.68f);
            root.pivot = new Vector2(0.5f, 0.5f);
            root.sizeDelta = new Vector2(440f, 180f);

            var tail = new GameObject("Tail", typeof(Image));
            tail.transform.SetParent(root, false);
            tail.GetComponent<Image>().color = Parchment;
            var tailRt = (RectTransform)tail.transform;
            tailRt.anchorMin = tailRt.anchorMax = new Vector2(0.82f, 0f);
            tailRt.pivot = new Vector2(0.5f, 0.5f);
            tailRt.anchoredPosition = new Vector2(0f, -9f);
            tailRt.sizeDelta = new Vector2(34f, 34f);
            tailRt.localRotation = Quaternion.Euler(0f, 0f, 45f);

            var body = new GameObject("Bubble", typeof(Image));
            body.transform.SetParent(root, false);
            Stretch((RectTransform)body.transform);
            body.GetComponent<Image>().color = Parchment;

            var text = MakeText(body.transform, "Description",
                "Una spada di legno, consumata da mille battaglie immaginate. " +
                "L'elsa è liscia dove le tue mani l'hanno stretta più spesso.",
                22, Ink);
            Stretch(text.rectTransform, 28f, 52f, 24f, 24f);
            text.alignment = TextAnchor.MiddleLeft;

            var close = MakeButton(body.transform, "Close",
                new Vector2(190f, 136f), out Text closeLabel,
                new Vector2(38f, 38f));
            closeLabel.text = "×";
            closeLabel.fontSize = 25;
            close.onClick.AddListener(() => _speechBubble.SetActive(false));
            _speechBubble.SetActive(false);
        }

        void BuildTransition(Transform parent)
        {
            _transition = new GameObject("DayTransition", typeof(Image),
                typeof(CanvasGroup));
            _transition.transform.SetParent(parent, false);
            Stretch((RectTransform)_transition.transform);
            _transition.GetComponent<Image>().color = Color.black;
            _transitionGroup = _transition.GetComponent<CanvasGroup>();

            _transitionText = MakeText(_transition.transform, "DayLabel", "", 36,
                new Color(0.94f, 0.88f, 0.74f));
            var rt = _transitionText.rectTransform;
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 0.5f);
            rt.pivot = new Vector2(0.5f, 0.5f);
            rt.sizeDelta = new Vector2(600f, 80f);
            _transitionText.alignment = TextAnchor.MiddleCenter;
            _transitionText.fontStyle = FontStyle.Italic;
        }

        void ShowModal(string title, string prompt, string primaryLabel,
            UnityAction primaryAction, string secondaryLabel,
            UnityAction secondaryAction)
        {
            _modalTitle.text = title;
            _modalPrompt.text = prompt;
            ConfigureButton(_primaryButton, _primaryLabel,
                primaryLabel, primaryAction);
            ConfigureButton(_secondaryButton, _secondaryLabel,
                secondaryLabel, secondaryAction);
            _modal.SetActive(true);
            SetPlayerEnabled(false);
        }

        void CloseModal()
        {
            if (_modal != null) _modal.SetActive(false);
            if (!_transitioning) SetPlayerEnabled(true);
        }

        void SetPlayerEnabled(bool enabled)
        {
            if (_player != null) _player.enabled = enabled;
        }

        static void ConfigureButton(Button button, Text label, string text,
            UnityAction action)
        {
            label.text = text;
            button.onClick.RemoveAllListeners();
            button.onClick.AddListener(action);
        }

        Button MakeButton(Transform parent, string name, Vector2 position,
            out Text label, Vector2? size = null)
        {
            var go = new GameObject(name, typeof(Image), typeof(Button));
            go.transform.SetParent(parent, false);
            go.GetComponent<Image>().color = ButtonColor;
            var rt = (RectTransform)go.transform;
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, 0f);
            rt.pivot = new Vector2(0.5f, 0f);
            rt.anchoredPosition = position;
            rt.sizeDelta = size ?? new Vector2(230f, 52f);

            label = MakeText(go.transform, "Label", "", 21,
                new Color(0.97f, 0.91f, 0.78f));
            Stretch(label.rectTransform, 8f, 8f, 4f, 4f);
            label.alignment = TextAnchor.MiddleCenter;
            return go.GetComponent<Button>();
        }

        Text MakeText(Transform parent, string name, string content,
            int size, Color color)
        {
            var go = new GameObject(name, typeof(Text));
            go.transform.SetParent(parent, false);
            var text = go.GetComponent<Text>();
            text.font = _font;
            text.fontSize = size;
            text.color = color;
            text.text = content;
            text.horizontalOverflow = HorizontalWrapMode.Wrap;
            text.verticalOverflow = VerticalWrapMode.Truncate;
            return text;
        }

        static void EnsureEventSystem()
        {
            if (FindAnyObjectByType<EventSystem>() == null)
            {
                new GameObject("EventSystem", typeof(EventSystem),
                    typeof(StandaloneInputModule));
            }
        }

        static void Stretch(RectTransform rt, float left = 0f,
            float right = 0f, float bottom = 0f, float top = 0f)
        {
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = new Vector2(left, bottom);
            rt.offsetMax = new Vector2(-right, -top);
        }

        static void SetRect(RectTransform rt, Vector2 offsetMin,
            Vector2 offsetMax)
        {
            rt.anchorMin = new Vector2(0f, 1f);
            rt.anchorMax = new Vector2(1f, 1f);
            rt.pivot = new Vector2(0.5f, 1f);
            rt.offsetMin = offsetMin;
            rt.offsetMax = offsetMax;
        }
    }
}
