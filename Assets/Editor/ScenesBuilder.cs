using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace IlLungoViaggio.EditorTools
{
    /// <summary>
    /// Genera le scene Title e Prologue (bootstrap a runtime) e imposta l'ordine
    /// dei Build Settings: Title → Prologue → Act1Slice.
    ///   -executeMethod IlLungoViaggio.EditorTools.ScenesBuilder.BuildScenes
    /// </summary>
    public static class ScenesBuilder
    {
        [MenuItem("Il Lungo Viaggio/Rigenera scene gioco")]
        public static void BuildScenes()
        {
            System.IO.Directory.CreateDirectory("Assets/Scenes");
            CreateScene("Assets/Scenes/Title.unity", typeof(IlLungoViaggio.TitleBootstrap));
            CreateScene("Assets/Scenes/Prologue.unity", typeof(IlLungoViaggio.PrologueBootstrap));

            EditorBuildSettings.scenes = new[]
            {
                new EditorBuildSettingsScene("Assets/Scenes/Title.unity", true),
                new EditorBuildSettingsScene("Assets/Scenes/Prologue.unity", true),
                new EditorBuildSettingsScene("Assets/Scenes/Act1Slice.unity", true),
            };
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
            Debug.Log("[ScenesBuilder] Title+Prologue generate; build settings aggiornati.");
        }

        static void CreateScene(string path, System.Type bootstrap)
        {
            var scene = EditorSceneManager.NewScene(
                NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);
            var go = new GameObject("Bootstrap");
            go.AddComponent(bootstrap);
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene, path);
        }
    }
}
