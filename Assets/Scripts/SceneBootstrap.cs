using UnityEngine;

namespace IlLungoViaggio
{
    /// <summary>
    /// Costruisce la scena-slice a runtime, così "Play" funziona subito.
    ///
    /// Con arte reale in Resources (scene-bg, ernesto):
    ///   - inquadra l'intera stanza con camera ORTOGRAFICA STATICA;
    ///   - scala Ernesto a un'altezza credibile da bambino;
    ///   - lo posiziona sul pavimento e ne limita il cammino ai bordi stanza.
    /// Senza arte: usa placeholder colorati con camera che segue.
    /// </summary>
    public class SceneBootstrap : MonoBehaviour
    {
        [Header("Fallback (senza arte)")]
        public Color backgroundFallback = new Color(0.18f, 0.16f, 0.22f);
        public Color playerColor = new Color(0.92f, 0.78f, 0.45f);

        [Header("Inquadratura con arte reale")]
        [Tooltip("Altezza di Ernesto come frazione dell'altezza della stanza.")]
        public float playerHeightFraction = 0.34f;
        [Tooltip("Fascia di pavimento (frazioni dell'altezza, da centro stanza).")]
        public float floorTop = -0.10f;
        public float floorBottom = -0.38f;
        [Tooltip("Margine orizzontale dai bordi della stanza, in frazione.")]
        public float sideMargin = 0.06f;

        GameObject _player;
        bool _staticCamera;

        void Awake()
        {
            Sprite bg = Resources.Load<Sprite>("scene-bg");
            Sprite ernesto = Resources.Load<Sprite>("ernesto");

            if (bg != null) BuildRoom(bg, ernesto);
            else BuildPlaceholder();
        }

        // ---- Stanza reale ------------------------------------------------

        void BuildRoom(Sprite bg, Sprite ernesto)
        {
            _staticCamera = true;

            var bgGo = new GameObject("Background");
            var bgSr = bgGo.AddComponent<SpriteRenderer>();
            bgSr.sprite = bg;
            bgSr.sortingOrder = -100;
            bgGo.transform.position = Vector3.zero;

            Vector2 room = bg.bounds.size; // dimensioni mondo dello sfondo

            var cam = EnsureCamera();
            cam.orthographic = true;
            cam.orthographicSize = room.y * 0.5f;
            cam.transform.position = new Vector3(0f, 0f, -10f);

            float targetH = room.y * playerHeightFraction;
            _player = new GameObject("Ernesto"); // root: movimento + flip

            var body = new GameObject("Body");
            body.transform.SetParent(_player.transform, false);
            var sr = body.AddComponent<SpriteRenderer>();
            sr.sortingOrder = 10;

            float bodyScale;
            if (ernesto != null)
            {
                sr.sprite = ernesto;
                bodyScale = targetH / ernesto.bounds.size.y;
            }
            else
            {
                sr.sprite = SolidSprite(playerColor, 26, 52);
                bodyScale = targetH / (52f / 32f);
            }
            body.transform.localScale = new Vector3(bodyScale, bodyScale, 1f);

            var anim = body.AddComponent<CharacterAnimator2D>();
            anim.referenceHeight = targetH;

            float halfW = room.x * 0.5f;
            float minX = -halfW + room.x * sideMargin;
            float maxX = halfW - room.x * sideMargin;
            float minY = room.y * floorBottom;
            float maxY = room.y * floorTop;

            _player.transform.position = new Vector3(0f, (minY + maxY) * 0.5f, 0f);

            var ctrl = _player.AddComponent<PlayerController2D>();
            ctrl.moveSpeed = room.x * 0.18f;
            ctrl.clampToBounds = true;
            ctrl.movementBounds = new Bounds(
                new Vector3((minX + maxX) * 0.5f, (minY + maxY) * 0.5f, 0f),
                new Vector3(maxX - minX, maxY - minY, 1f));

            // Letto e spada fanno parte dell'illustrazione di sfondo: gli
            // hotspot e la relativa UI vengono quindi costruiti a runtime
            // usando le dimensioni dello sprite come riferimento.
            var interactions = gameObject.AddComponent<RoomInteractionController>();
            interactions.Initialize(room, ctrl);
        }

        // ---- Placeholder -------------------------------------------------

        void BuildPlaceholder()
        {
            var cam = EnsureCamera();
            cam.orthographic = true;
            cam.orthographicSize = 5f;
            cam.backgroundColor = backgroundFallback;
            cam.transform.position = new Vector3(0f, 0f, -10f);

            var bg = new GameObject("Background");
            var bgSr = bg.AddComponent<SpriteRenderer>();
            bgSr.sortingOrder = -100;
            bgSr.sprite = SolidSprite(backgroundFallback, 32, 18);
            bg.transform.localScale = new Vector3(2f, 2f, 1f);

            _player = new GameObject("Ernesto");
            var body = new GameObject("Body");
            body.transform.SetParent(_player.transform, false);
            var sr = body.AddComponent<SpriteRenderer>();
            sr.sortingOrder = 10;
            sr.sprite = SolidSprite(playerColor, 26, 52);
            var anim = body.AddComponent<CharacterAnimator2D>();
            anim.referenceHeight = 52f / 32f;
            var ctrl = _player.AddComponent<PlayerController2D>();
            ctrl.moveSpeed = 4f;
        }

        void LateUpdate()
        {
            if (_staticCamera || _player == null || Camera.main == null) return;
            Vector3 t = _player.transform.position;
            t.z = Camera.main.transform.position.z;
            Camera.main.transform.position = Vector3.Lerp(
                Camera.main.transform.position, t, 5f * Time.deltaTime);
        }

        Camera EnsureCamera()
        {
            Camera cam = Camera.main;
            if (cam == null)
            {
                var go = new GameObject("Main Camera");
                go.tag = "MainCamera";
                cam = go.AddComponent<Camera>();
            }
            return cam;
        }

        static Sprite SolidSprite(Color color, int wPx, int hPx)
        {
            wPx = Mathf.Max(1, wPx);
            hPx = Mathf.Max(1, hPx);
            var tex = new Texture2D(wPx, hPx);
            var px = new Color[wPx * hPx];
            for (int i = 0; i < px.Length; i++) px[i] = color;
            tex.SetPixels(px);
            tex.filterMode = FilterMode.Point;
            tex.Apply();
            return Sprite.Create(tex, new Rect(0, 0, wPx, hPx),
                new Vector2(0.5f, 0.5f), 32f);
        }
    }
}
