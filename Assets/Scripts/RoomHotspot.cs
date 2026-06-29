using UnityEngine;
using UnityEngine.EventSystems;

namespace IlLungoViaggio
{
    /// <summary>
    /// Collider invisibile sovrapposto a un oggetto disegnato nello sfondo.
    /// Inoltra hover e click al controller della stanza.
    /// </summary>
    [RequireComponent(typeof(BoxCollider2D))]
    public class RoomHotspot : MonoBehaviour
    {
        RoomInteractionController _controller;
        RoomInteractionController.HotspotKind _kind;
        string _label;

        public void Configure(RoomInteractionController controller,
            RoomInteractionController.HotspotKind kind, string label,
            Vector2 size)
        {
            _controller = controller;
            _kind = kind;
            _label = label;

            var collider = GetComponent<BoxCollider2D>();
            collider.size = size;
            collider.isTrigger = true;
        }

        void OnMouseEnter()
        {
            if (_controller != null)
                _controller.SetHotspotHover(_label, transform.position);
        }

        void OnMouseExit()
        {
            if (_controller != null) _controller.ClearHotspotHover();
        }

        void OnMouseUpAsButton()
        {
            if (_controller == null || _controller.IsInteractionBlocked) return;
            if (EventSystem.current != null
                && EventSystem.current.IsPointerOverGameObject()) return;

            _controller.SelectHotspot(_kind);
        }
    }
}
