using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace IlLungoViaggio
{
    /// <summary>
    /// Vista narrativa costruita interamente a runtime: output TextMeshPro,
    /// input e bottoni uGUI. Supporta tipografia e palette per ruolo/voce.
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
        static readonly Color WarmKeyword = new Color(0.96f, 0.72f, 0.30f);
        static readonly Color ColdKeyword = new Color(0.60f, 0.86f, 0.96f);
        static readonly Color ErnestoText = new Color(0.48f, 0.76f, 0.96f);
        static readonly Color MireaText = new Color(0.94f, 0.61f, 0.64f);
        static readonly Color LesmidoomText = new Color(0.68f, 0.80f, 0.52f);
        static readonly Color FabbroText = new Color(0.90f, 0.60f, 0.34f);
        static readonly Color SoldatoText = new Color(0.68f, 0.72f, 0.80f);
        static readonly Color GenericDialogueText = new Color(0.78f, 0.68f, 0.88f);

        Font _font;
        TMP_FontAsset _narrativeFont;
        TMP_FontAsset _dialogueFont;
        TMP_FontAsset _keywordFont;
        Image _bg;
        TextMeshProUGUI _output;
        ScrollRect _scroll;
        InputField _input;
        RectTransform _choices;
        readonly List<GameObject> _choiceButtons = new List<GameObject>();
        bool _dream;

        void Awake()
        {
            _font = LoadNarrativeFont();
            var fallback = Resources.Load<TMP_FontAsset>(
                "Fonts & Materials/LiberationSans SDF");
            _narrativeFont = CreateTmpFont(_font, "ILV Narrative") ?? fallback;
            _dialogueFont = CreateTmpFont(LoadDialogueFont(), "ILV Dialogue")
                            ?? fallback ?? _narrativeFont;
            _keywordFont = CreateTmpFont(LoadKeywordFont(), "ILV Keyword")
                           ?? _narrativeFont;
            BuildUI();
        }

        // ---- API pubblica ------------------------------------------------

        public void Print(string text) => Append(text, _dream ? ColdText : WarmText);
        public void PrintSystem(string text) => Append(text, SystemText);

        public IEnumerator PrintAnimated(string text, float charactersPerSecond,
            string speaker)
        {
            text = text ?? "";
            if (text.Length == 0) yield break;

            bool dream = _dream;
            bool lineHasQuotes = text.IndexOf('"') >= 0;
            string previousOutput = _output.text;
            string separator = previousOutput.Length > 0 ? "\n" : "";
            var visible = new StringBuilder(text.Length);
            float speed = Mathf.Max(1f, charactersPerSecond);

            // Evita che il click/Invio usato per scegliere un'opzione salti
            // anche la prima riga della risposta nello stesso frame.
            yield return null;

            for (int i = 0; i < text.Length; i++)
            {
                if (WantsToCompleteLine())
                {
                    visible.Append(text, i, text.Length - i);
                    break;
                }

                char current = text[i];
                visible.Append(current);
                SetAnimatedOutput(previousOutput, separator, visible,
                    speaker, dream, lineHasQuotes, true);

                float delay = CharacterDelay(current, speed, i);
                float elapsed = 0f;
                while (elapsed < delay)
                {
                    if (WantsToCompleteLine())
                    {
                        int remainderStart = i + 1;
                        if (remainderStart < text.Length)
                            visible.Append(text, remainderStart,
                                text.Length - remainderStart);
                        i = text.Length;
                        break;
                    }

                    elapsed += Time.unscaledDeltaTime;
                    yield return null;
                }
            }

            SetAnimatedOutput(previousOutput, separator, visible,
                speaker, dream, lineHasQuotes, false);
        }

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
            canvas.pixelPerfect = true;
            var scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1280, 720);
            scaler.screenMatchMode = CanvasScaler.ScreenMatchMode.MatchWidthOrHeight;
            scaler.matchWidthOrHeight = 0.5f;

            _bg = CreatePanel(canvasGo.transform, "Background", WarmBg);
            Stretch(_bg.rectTransform, 0, 0, 0, 0);

            // Output scrollabile (occupa la parte alta)
            var scrollGo = new GameObject("Output",
                typeof(Image), typeof(ScrollRect), typeof(RectMask2D));
            scrollGo.transform.SetParent(_bg.transform, false);
            scrollGo.GetComponent<Image>().color = new Color(0, 0, 0, 0.15f);
            var scrollRt = (RectTransform)scrollGo.transform;
            Stretch(scrollRt, 32, 32, 148, 28); // spazio per scelte + input

            _scroll = scrollGo.GetComponent<ScrollRect>();
            _scroll.horizontal = false;
            _scroll.vertical = true;
            _scroll.scrollSensitivity = 24;
            _scroll.viewport = scrollRt;

            var content = new GameObject("Content", typeof(RectTransform),
                typeof(ContentSizeFitter), typeof(VerticalLayoutGroup));
            content.transform.SetParent(scrollGo.transform, false);
            var contentRt = (RectTransform)content.transform;
            contentRt.anchorMin = new Vector2(0, 1);
            contentRt.anchorMax = new Vector2(1, 1);
            contentRt.pivot = new Vector2(0.5f, 1);
            // Un RectTransform appena creato parte largo 100 px. Azzerare la
            // sizeDelta lo fa coincidere con la viewport e impedisce che i primi
            // caratteri finiscano a sinistra della maschera.
            contentRt.anchoredPosition = Vector2.zero;
            contentRt.sizeDelta = Vector2.zero;
            var fitter = content.GetComponent<ContentSizeFitter>();
            fitter.verticalFit = ContentSizeFitter.FitMode.PreferredSize;
            var vlg = content.GetComponent<VerticalLayoutGroup>();
            vlg.childControlWidth = true; vlg.childControlHeight = true;
            vlg.childForceExpandWidth = true; vlg.childForceExpandHeight = false;
            vlg.padding = new RectOffset(18, 18, 16, 16);
            vlg.spacing = 8;
            _scroll.content = contentRt;

            _output = CreateOutputText(content.transform);

            // Contenitore scelte (sopra l'input)
            var choicesGo = new GameObject("Choices", typeof(RectTransform),
                typeof(HorizontalLayoutGroup));
            choicesGo.transform.SetParent(_bg.transform, false);
            _choices = (RectTransform)choicesGo.transform;
            _choices.anchorMin = new Vector2(0, 0);
            _choices.anchorMax = new Vector2(1, 0);
            _choices.pivot = new Vector2(0.5f, 0);
            _choices.anchoredPosition = new Vector2(0, 76);
            _choices.sizeDelta = new Vector2(-64, 60);
            var hlg = choicesGo.GetComponent<HorizontalLayoutGroup>();
            hlg.childControlWidth = true; hlg.childControlHeight = true;
            hlg.childForceExpandWidth = false; hlg.spacing = 8;
            hlg.childForceExpandHeight = true;
            hlg.childAlignment = TextAnchor.MiddleLeft;

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
            rt.anchoredPosition = new Vector2(0, 20);
            rt.sizeDelta = new Vector2(-64, 44);

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
            if (_input.gameObject.activeInHierarchy) FocusInput();
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
            var layout = go.GetComponent<LayoutElement>();
            layout.minHeight = 48;
            layout.preferredHeight = 52;
            layout.minWidth = 180;
            layout.preferredWidth = Mathf.Clamp(label.Length * 10f + 36f, 180f, 420f);

            var txt = CreateText(go.transform, "Label", label, WarmText, 19);
            Stretch(txt.rectTransform, 16, 16, 6, 6);
            txt.alignment = TextAnchor.MiddleCenter;

            int captured = id;
            go.GetComponent<Button>().onClick.AddListener(() => OnChoice?.Invoke(captured));
            _choiceButtons.Add(go);
        }

        // ---- Output / scroll ---------------------------------------------

        void Append(string text, Color color)
        {
            if (_output.text.Length > 0) _output.text += "\n";
            if (color == SystemText)
                _output.text += WrapSystemText(text);
            else
                _output.text += FormatStoryText(text, null, _dream,
                    text.IndexOf('"') >= 0);
            ScrollToBottom();
        }

        void SetAnimatedOutput(string previousOutput, string separator,
            StringBuilder visible, string speaker, bool dream,
            bool lineHasQuotes, bool showCaret)
        {
            _output.text = previousOutput + separator
                + FormatStoryText(visible.ToString(), speaker, dream,
                    lineHasQuotes)
                + (showCaret ? WrapSystemText("|") : "");
            ScrollToBottom();
        }

        string FormatStoryText(string raw, string speaker, bool dream,
            bool lineHasQuotes)
        {
            var formatted = new StringBuilder(raw.Length + 96);
            var segment = new StringBuilder(raw.Length);
            bool inQuote = false;
            bool inKeyword = false;

            for (int i = 0; i < raw.Length; i++)
            {
                char character = raw[i];
                if (character == '*')
                {
                    AppendStyledSegment(formatted, segment,
                        inKeyword ? TextRole.Keyword
                        : inQuote || (!lineHasQuotes && !string.IsNullOrEmpty(speaker))
                            ? TextRole.Dialogue : TextRole.Narration,
                        speaker, dream);
                    inKeyword = !inKeyword;
                    continue;
                }

                if (character == '"' && !inKeyword)
                {
                    if (!inQuote)
                    {
                        AppendStyledSegment(formatted, segment,
                            TextRole.Narration, speaker, dream);
                        inQuote = true;
                        segment.Append(character);
                    }
                    else
                    {
                        segment.Append(character);
                        AppendStyledSegment(formatted, segment,
                            TextRole.Dialogue, speaker, dream);
                        inQuote = false;
                    }
                    continue;
                }

                segment.Append(character);
            }

            TextRole finalRole = inKeyword ? TextRole.Keyword
                : inQuote || (!lineHasQuotes && !string.IsNullOrEmpty(speaker))
                    ? TextRole.Dialogue : TextRole.Narration;
            AppendStyledSegment(formatted, segment, finalRole, speaker, dream);
            return formatted.ToString();
        }

        void AppendStyledSegment(StringBuilder target, StringBuilder segment,
            TextRole role, string speaker, bool dream)
        {
            if (segment.Length == 0) return;

            TMP_FontAsset font;
            Color color;
            string decorationOpen = "";
            string decorationClose = "";

            switch (role)
            {
                case TextRole.Dialogue:
                    font = _dialogueFont;
                    color = CharacterColor(speaker);
                    decorationOpen = "<i>";
                    decorationClose = "</i>";
                    break;
                case TextRole.Keyword:
                    font = _keywordFont;
                    color = dream ? ColdKeyword : WarmKeyword;
                    decorationOpen = "<b><size=108%>";
                    decorationClose = "</size></b>";
                    break;
                default:
                    font = _narrativeFont;
                    color = dream ? ColdText : WarmText;
                    break;
            }

            string hex = ColorUtility.ToHtmlStringRGB(color);
            string fontName = RegisteredFontName(font);
            if (fontName != null)
                target.Append("<font=\"").Append(fontName).Append("\">");
            target.Append("<color=#").Append(hex).Append('>')
                .Append(decorationOpen)
                .Append(segment).Append(decorationClose)
                .Append("</color>");
            if (fontName != null) target.Append("</font>");
            segment.Clear();
        }

        string WrapSystemText(string text)
        {
            TMP_FontAsset font = _dialogueFont ?? _narrativeFont;
            string hex = ColorUtility.ToHtmlStringRGB(SystemText);
            string fontName = RegisteredFontName(font);
            string opening = fontName != null ? $"<font=\"{fontName}\">" : "";
            string closing = fontName != null ? "</font>" : "";
            return $"{opening}<color=#{hex}>{text}</color>{closing}";
        }

        static string RegisteredFontName(TMP_FontAsset font)
        {
            if (font == null || string.IsNullOrWhiteSpace(font.name)) return null;
            return MaterialReferenceManager.TryGetFontAsset(
                font.hashCode, out var registered) && registered == font
                ? font.name : null;
        }

        static Color CharacterColor(string speaker)
        {
            switch ((speaker ?? "").Trim().ToLowerInvariant())
            {
                case "ernesto": return ErnestoText;
                case "mirea": return MireaText;
                case "vecchio":
                case "lesmidoom": return LesmidoomText;
                case "fabbro": return FabbroText;
                case "soldato": return SoldatoText;
                default: return GenericDialogueText;
            }
        }

        static float CharacterDelay(char character, float speed, int index)
        {
            float baseDelay = 1f / speed;
            float organicCadence = 0.88f + (index % 7) * 0.035f;

            if (char.IsWhiteSpace(character)) return baseDelay * 0.35f;
            if (character == ',' || character == ';' || character == ':')
                return baseDelay * organicCadence + 0.065f;
            if (character == '.' || character == '!' || character == '?')
                return baseDelay * organicCadence + 0.14f;
            if (character == '—')
                return baseDelay * organicCadence + 0.09f;

            return baseDelay * organicCadence;
        }

        static bool WantsToCompleteLine()
        {
            return Input.GetMouseButtonDown(0)
                   || Input.GetKeyDown(KeyCode.Space)
                   || Input.GetKeyDown(KeyCode.Return)
                   || Input.GetKeyDown(KeyCode.KeypadEnter);
        }

        void ScrollToBottom()
        {
            Canvas.ForceUpdateCanvases();
            if (_scroll != null) _scroll.verticalNormalizedPosition = 0f;
        }

        // ---- Helper uGUI -------------------------------------------------

        enum TextRole
        {
            Narration,
            Dialogue,
            Keyword
        }

        static Font LoadNarrativeFont()
        {
            return LoadFont(new[]
            {
                "Georgia", "Palatino", "Baskerville", "Times New Roman",
                "Noto Serif", "DejaVu Serif"
            });
        }

        static Font LoadDialogueFont()
        {
            return LoadFont(new[]
            {
                "Avenir Next", "Gill Sans", "Trebuchet MS", "Noto Sans",
                "DejaVu Sans"
            });
        }

        static Font LoadKeywordFont()
        {
            return LoadFont(new[]
            {
                "Copperplate", "Baskerville", "Palatino", "Noto Serif",
                "DejaVu Serif"
            });
        }

        static Font LoadFont(string[] preferred)
        {
#if !UNITY_WEBGL || UNITY_EDITOR
            string[] installed = Font.GetOSInstalledFontNames();
            foreach (string candidate in preferred)
            {
                foreach (string installedName in installed)
                {
                    if (!string.Equals(candidate, installedName,
                            StringComparison.OrdinalIgnoreCase)) continue;

                    var font = Font.CreateDynamicFontFromOSFont(installedName, 24);
                    if (font != null) return font;
                }
            }
#endif
            return Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf")
                   ?? Resources.GetBuiltinResource<Font>("Arial.ttf");
        }

        static TMP_FontAsset CreateTmpFont(Font font, string assetName)
        {
            if (font == null) return null;
#if UNITY_WEBGL && !UNITY_EDITOR
            return null;
#else
            var asset = TMP_FontAsset.CreateFontAsset(font.name, "Regular", 64);
            if (asset != null)
            {
                asset.name = assetName;
                asset.hashCode = 0;
                if (asset.material != null)
                    asset.material.name = assetName + " Material";
                asset.ReadFontAssetDefinition();
                MaterialReferenceManager.AddFontAsset(asset);
            }
            return asset;
#endif
        }

        static void EnsureEventSystem()
        {
            if (FindAnyObjectByType<EventSystem>() == null)
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

        TextMeshProUGUI CreateOutputText(Transform parent)
        {
            var go = new GameObject("OutputText", typeof(TextMeshProUGUI));
            go.transform.SetParent(parent, false);
            var text = go.GetComponent<TextMeshProUGUI>();
            text.font = _narrativeFont;
            text.fontSize = 24;
            text.color = Color.white;
            text.text = "";
            text.alignment = TextAlignmentOptions.TopLeft;
            text.textWrappingMode = TextWrappingModes.Normal;
            text.overflowMode = TextOverflowModes.Overflow;
            text.richText = true;
            text.lineSpacing = 4f;
            text.raycastTarget = false;
            return text;
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
