using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace IlLungoViaggio
{
    /// <summary>
    /// Schermata titolo costruita a runtime: sfondo dipinto, titolo e i bottoni
    /// "Nuova partita" / "Riprendi" (quest'ultimo solo se esiste un salvataggio).
    /// </summary>
    public class TitleBootstrap : MonoBehaviour
    {
        Font _font;

        void Start()
        {
            _font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf")
                    ?? Resources.GetBuiltinResource<Font>("Arial.ttf");
            BuildUI();
        }

        void BuildUI()
        {
            if (FindObjectOfType<EventSystem>() == null)
                new GameObject("EventSystem",
                    typeof(EventSystem), typeof(StandaloneInputModule));

            var canvasGo = new GameObject("TitleCanvas",
                typeof(Canvas), typeof(CanvasScaler), typeof(GraphicRaycaster));
            var canvas = canvasGo.GetComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            var scaler = canvasGo.GetComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1280, 720);

            // Sfondo
            var bgGo = new GameObject("Bg", typeof(Image));
            bgGo.transform.SetParent(canvasGo.transform, false);
            var bg = bgGo.GetComponent<Image>();
            Stretch((RectTransform)bgGo.transform);
            var bgTex = Resources.Load<Texture2D>("title-bg");
            if (bgTex != null)
            {
                bg.sprite = Sprite.Create(bgTex,
                    new Rect(0, 0, bgTex.width, bgTex.height), new Vector2(0.5f, 0.5f));
                bg.preserveAspect = false;
            }
            else bg.color = new Color(0.08f, 0.07f, 0.06f);

            // Scrim per leggibilità
            var scrim = new GameObject("Scrim", typeof(Image));
            scrim.transform.SetParent(canvasGo.transform, false);
            scrim.GetComponent<Image>().color = new Color(0, 0, 0, 0.45f);
            Stretch((RectTransform)scrim.transform);

            // Titolo
            var title = MakeText(canvasGo.transform, "Il Lungo Viaggio",
                64, new Color(0.95f, 0.90f, 0.78f));
            var trt = title.rectTransform;
            trt.anchorMin = trt.anchorMax = new Vector2(0.5f, 0.72f);
            trt.pivot = new Vector2(0.5f, 0.5f);
            trt.sizeDelta = new Vector2(900, 100);
            title.alignment = TextAnchor.MiddleCenter;

            float y = 0.45f;
            MakeButton(canvasGo.transform, "Nuova partita", y,
                () => GameFlow.LoadPrologue(false));

            if (SaveSystem.HasSave())
            {
                MakeButton(canvasGo.transform, "Riprendi", y - 0.12f,
                    () => GameFlow.LoadPrologue(true));
            }
        }

        void MakeButton(Transform parent, string label, float anchorY,
            UnityEngine.Events.UnityAction onClick)
        {
            var go = new GameObject(label, typeof(Image), typeof(Button));
            go.transform.SetParent(parent, false);
            go.GetComponent<Image>().color = new Color(0.22f, 0.17f, 0.13f, 0.92f);
            var rt = (RectTransform)go.transform;
            rt.anchorMin = rt.anchorMax = new Vector2(0.5f, anchorY);
            rt.pivot = new Vector2(0.5f, 0.5f);
            rt.sizeDelta = new Vector2(320, 56);

            var txt = MakeText(go.transform, label, 24, new Color(0.95f, 0.90f, 0.78f));
            Stretch(txt.rectTransform);
            txt.alignment = TextAnchor.MiddleCenter;

            go.GetComponent<Button>().onClick.AddListener(onClick);
        }

        Text MakeText(Transform parent, string content, int size, Color color)
        {
            var go = new GameObject("Text", typeof(Text));
            go.transform.SetParent(parent, false);
            var t = go.GetComponent<Text>();
            t.font = _font; t.fontSize = size; t.color = color; t.text = content;
            t.alignment = TextAnchor.MiddleCenter;
            t.horizontalOverflow = HorizontalWrapMode.Overflow;
            t.verticalOverflow = VerticalWrapMode.Overflow;
            return t;
        }

        static void Stretch(RectTransform rt)
        {
            rt.anchorMin = Vector2.zero; rt.anchorMax = Vector2.one;
            rt.offsetMin = Vector2.zero; rt.offsetMax = Vector2.zero;
        }
    }
}
