using UnityEngine.SceneManagement;

namespace IlLungoViaggio
{
    /// <summary>Flusso tra le scene del gioco e stato di avvio condiviso.</summary>
    public static class GameFlow
    {
        public const string PrologueScene = "Prologue";
        public const string Act1Scene = "Act1Slice";

        /// <summary>True se il prologo deve riprendere dal salvataggio.</summary>
        public static bool Resume;

        public static void LoadPrologue(bool resume)
        {
            Resume = resume;
            SceneManager.LoadScene(PrologueScene);
        }

        public static void LoadAct1() => SceneManager.LoadScene(Act1Scene);
    }
}
