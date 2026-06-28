using UnityEngine;

namespace IlLungoViaggio
{
    /// <summary>
    /// Movimento 2D di Ernesto. Input Manager classico (frecce / WASD).
    /// Niente fisica: spostamento diretto del transform, sufficiente per
    /// l'esplorazione "alla Pentiment" di una scena-pagina curata.
    /// </summary>
    public class PlayerController2D : MonoBehaviour
    {
        [Tooltip("Velocità di movimento in unità/secondo.")]
        public float moveSpeed = 4f;

        [Tooltip("Se assegnata, il movimento resta dentro questi limiti del mondo.")]
        public Bounds movementBounds;
        public bool clampToBounds;

        /// <summary>True nel frame in cui Ernesto si sta muovendo (per l'animazione).</summary>
        public bool IsMoving { get; private set; }

        void Update()
        {
            float h = Input.GetAxisRaw("Horizontal");
            float v = Input.GetAxisRaw("Vertical");

            Vector3 dir = new Vector3(h, v, 0f);
            IsMoving = dir.sqrMagnitude > 0.0001f;
            if (dir.sqrMagnitude > 1f) dir.Normalize();

            transform.position += dir * moveSpeed * Time.deltaTime;

            if (clampToBounds)
            {
                Vector3 p = transform.position;
                p.x = Mathf.Clamp(p.x, movementBounds.min.x, movementBounds.max.x);
                p.y = Mathf.Clamp(p.y, movementBounds.min.y, movementBounds.max.y);
                transform.position = p;
            }

            // Flip orizzontale verso la direzione di marcia.
            if (Mathf.Abs(h) > 0.01f)
            {
                Vector3 s = transform.localScale;
                s.x = Mathf.Abs(s.x) * (h < 0f ? -1f : 1f);
                transform.localScale = s;
            }
        }
    }
}
