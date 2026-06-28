using UnityEngine;

namespace IlLungoViaggio
{
    /// <summary>Costruisce la scena del prologo a runtime e la avvia.</summary>
    public class PrologueBootstrap : MonoBehaviour
    {
        void Start()
        {
            var terminal = new GameObject("Terminal").AddComponent<TerminalView>();
            var music = new GameObject("Music").AddComponent<MusicManager>();
            music.PlayTheme();

            var controller = gameObject.AddComponent<PrologueController>();
            controller.Init(terminal, music);
        }
    }
}
