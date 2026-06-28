using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace IlLungoViaggio
{
    /// <summary>
    /// Vista a terminale costruita interamente a runtime (uGUI legacy, font
    /// builtin: niente prefab da montare, niente "TMP Essentials" da importare).
    /// Output scorrevole + riga di input + bottoni situazionali. L'estetica
    /// diegetica (monospace, palette) è polish successivo.
    ///
    /// Eventi: OnCommand(testo digitato), OnChoice(id del bottone premuto).
    /// </summary>
    public class TerminalView : MonoBehaviour
    {
        public event Action<string> OnCommand;
        public event Action<int> OnChoice;

        // Palette
        static readonly Color WarmBg = new Color(0.10f, 0.08f, 0.07f);
        static readonly Color WarmText = new Color(0.92f, 0.86f, 0.74f);
        static readonly Color SystemText = new Color(0.70f, 0.62f, 0.50f);
        static readonly Color ColdBg = new Color(0.07f, 0.08f, 0.11f);
        static readonly Color ColdText = new Color(0.78f, 0.84f, 0.92f);

        Font _font;
        Image _bg;
        Text _output;
        ScrollRect _scroll;
        InputField _input;
        RectTransform _choices;
        readonly List<GameObject> _choiceButtons = new List<GameObject>();
        bool _dream;

        void Awake()
        {
            _font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf")
                    ?? Resources.GetBuiltinResource<Font>("Arial.ttf");
            BuildUI();
        }

        // ---- API pubblica ------------------------------------------------

        public void Print(string text) => Append(text, _dream ? ColdText : WarmText);
        public void PrintSystem(string text) => Append(text, SystemText);

        public void ShowChoices(IList<KeyValuePair<string, int>> choices)
        {
            ClearChoices();
            foreach (var c in choices) CreateChoiceButton(c.Key, c.Value);
        }

        public void ClearChoices()
        {
            foreach (var go in _choiceButtons) Destroy(go);
            _choiceButtons.Clear();
        }

        public void SetInputActive(bool active)
        {
            _input.gameObject.SetActive(active);
            if (active) FocusInput();
        }

        public void SetDreamMode(bool on)
        {
            _dream = on;
            _bg.color = on ? ColdBg : WarmBg;
            _output.color = on ? ColdText : WarmText;
        }

        // ---- Costruzione UI ----------------------------------------------

        void BuildUI()
        {
            EnsureEventSystem();

            var canvasGo = new GameObject("TerminalCanvas",
                typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            canvasGo.transform.SetParent(transform, false);
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1280, 720);

            _bg = CreatePanel(canvasGo.transform, "Background", WarmBg);
            Stretch(_bg.rectTransform, 0, 0, 0, 0);

            // Output scrollabile (occupa la parte alta)
            var scrollGo = new GameObject("Output",
                typeof(Image), typeof(ScrollRect), typeof(RectMask2D));
            scrollGo.transform.SetParent(_bg.transform, false);
            scrollGo.GetComponent<Image>().color = new Color(0, 0, 0, 0.15f);
            var scrollRt = (RectTransform)scrollGo.transform;
            Stretch(scrollRt, 24, 24, 120, 24); // left,right,bottom(spazio input),top

            _scroll = scrollGo.GetComponent<ScrollRect>();
            _scroll.horizontal = false;
            _scroll.vertical = true;
            _scroll.scrollSensitivity = 24;

            var content = new GameObject("Content", typeof(RectTransform),
                typeof(ContentSizeFitter), typeof(VerticalLayoutGroup));
            content.transform.SetParent(scrollGo.transform, false);
            var contentRt = (RectTransform)content.transform;
            contentRt.anchorMin = new Vector2(0, 1);
            contentRt.anchorMax = new Vector2(1, 1);
            contentRt.pivot = new Vector2(0.5f, 1);
            var fitter = content.GetComponent<ContentSizeFitter>();
            fitter.verticalFit = ContentSizeFitter.FitMode.PreferredSize;
            var vlg = content.GetComponent<VerticalLayoutGroup>();
            vlg.childControlWidth = true; vlg.childControlHeight = true;
            vlg.childForceExpandWidth = true; vlg.childForceExpandHeight = false;
            vlg.padding = new RectOffset(12, 12, 12, 12);
            vlg.spacing = 6;
            _scroll.content = contentRt;

            _output = CreateText(content.transform, "OutputText", "", WarmText, 22);
            _output.alignment = TextAnchor.UpperLeft;
            _output.supportRichText = true;

            // Contenitore scelte (sopra l'input)
            var choicesGo = new GameObject("Choices", typeof(RectTransform),
                typeof(HorizontalLayoutGroup));
            choicesGo.transform.SetParent(_bg.transform, false);
            _choices = (RectTransform)choicesGo.transform;
            _choices.anchorMin = new Vector2(0, 0);
            _choices.anchorMax = new Vector2(1, 0);
            _choices.pivot = new Vector2(0.5f, 0);
            _choices.anchoredPosition = new Vector2(0, 64);
            _choices.sizeDelta = new Vector2(-48, 48);
            var hlg = choicesGo.GetComponent<HorizontalLayoutGroup>();
            hlg.childControlWidth = true; hlg.childControlHeight = true;
            hlg.childForceExpandWidth = false; hlg.spacing = 8;
            hlg.padding = new RectOffset(24, 24, 0, 0);

            // Input in basso
            BuildInput(_bg.transform);
        }

        void BuildInput(Transform parent)
        {
            var inputGo = new GameObject("Input", typeof(Image), typeof(InputField));
            inputGo.transform.SetParent(parent, false);
            inputGo.GetComponent<Image>().color = new Color(0, 0, 0, 0.35f);
            var rt = (RectTransform)inputGo.transform;
            rt.anchorMin = new Vector2(0, 0);
            rt.anchorMax = new Vector2(1, 0);
            rt.pivot = new Vector2(0.5f, 0);
            rt.anchoredPosition = new Vector2(0, 16);
            rt.sizeDelta = new Vector2(-48, 40);

            var placeholder = CreateText(inputGo.transform, "Placeholder",
                "> scrivi un comando…", new Color(0.6f, 0.55f, 0.45f), 20);
            Stretch(placeholder.rectTransform, 12, 12, 6, 6);
            placeholder.alignment = TextAnchor.MiddleLeft;

            var textComp = CreateText(inputGo.transform, "Text", "", WarmText, 20);
            Stretch(textComp.rectTransform, 12, 12, 6, 6);
            textComp.alignment = TextAnchor.MiddleLeft;
            textComp.supportRichText = false;

            _input = inputGo.GetComponent<InputField>();
            _input.textComponent = textComp;
            _input.placeholder = placeholder;
            _input.lineType = InputField.LineType.SingleLine;
            _input.onEndEdit.AddListener(HandleSubmit);
        }

        void HandleSubmit(string value)
        {
            // onEndEdit scatta anche per perdita focus: agisci solo se invio.
            bool entered = Input.GetKeyDown(KeyCode.Return)
                           || Input.GetKeyDown(KeyCode.KeypadEnter);
            if (!entered) return;

            value = (value ?? "").Trim();
            _input.text = "";
            if (value.Length > 0) OnCommand?.Invoke(value);
            FocusInput();
        }

        void FocusInput()
        {
            _input.ActivateInputField();
            _input.Select();
        }

        void CreateChoiceButton(string label, int id)
        {
            var go = new GameObject("Choice", typeof(Image), typeof(Button),
                typeof(LayoutElement));
            go.transform.SetParent(_choices, false);
            go.GetComponent<Image>().color = new Color(0.25f, 0.20f, 0.16f, 0.9f);
            go.GetComponent<LayoutElement>().minHeight = 40;
            go.GetComponent<LayoutElement>().minWidth = 120;

            var txt = CreateText(go.transform, "Label", label, WarmText, 18);
            Stretch(txt.rectTransform, 12, 12, 4, 4);
            txt.alignment = TextAnchor.MiddleCenter;

            int captured = id;
            go.GetComponent<Button>().onClick.AddListener(() => OnChoice?.Invoke(captured));
            _choiceButtons.Add(go);
        }

        // ---- Output / scroll ---------------------------------------------

        void Append(string text, Color color)
        {
            string hex = ColorUtility.ToHtmlStringRGB(color);
            if (_output.text.Length > 0) _output.text += "\n";
            _output.text += $"<color=#{hex}>{text}</color>";
            ScrollToBottom();
        }

        void ScrollToBottom()
        {
            Canvas.ForceUpdateCanvases();
            if (_scroll != null) _scroll.verticalNormalizedPosition = 0f;
        }

        // ---- Helper uGUI -------------------------------------------------

        static void EnsureEventSystem()
        {
            if (FindObjectOfType<EventSystem>() == null)
            {
                new GameObject("EventSystem",
                    typeof(EventSystem), typeof(StandaloneInputModule));
            }
        }

        Image CreatePanel(Transform parent, string name, Color color)
        {
            var go = new GameObject(name, typeof(Image));
            go.transform.SetParent(parent, false);
            var img = go.GetComponent<Image>();
            img.color = color;
            return img;
        }

        Text CreateText(Transform parent, string name, string content,
            Color color, int size)
        {
            var go = new GameObject(name, typeof(Text));
            go.transform.SetParent(parent, false);
            var t = go.GetComponent<Text>();
            t.font = _font;
            t.fontSize = size;
            t.color = color;
            t.text = content;
            t.horizontalOverflow = HorizontalWrapMode.Wrap;
            t.verticalOverflow = VerticalWrapMode.Overflow;
            return t;
        }

        static void Stretch(RectTransform rt, float left, float right,
            float bottom, float top)
        {
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.offsetMin = new Vector2(left, bottom);
            rt.offsetMax = new Vector2(-right, -top);
        }
    }
}
