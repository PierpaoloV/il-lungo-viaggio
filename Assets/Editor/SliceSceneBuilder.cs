using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace IlLungoViaggio.EditorTools
{
    /// <summary>
    /// Genera in automatico la scena della vertical-slice e la registra nei
    /// Build Settings. Pensato per essere eseguito da CLI batchmode:
    ///   Unity -projectPath ... -batchmode -quit -executeMethod \
    ///         IlLungoViaggio.EditorTools.SliceSceneBuilder.BuildSlice
    /// Disponibile anche dal menu: Il Lungo Viaggio > Rigenera scena slice.
    /// </summary>
    public static class SliceSceneBuilder
    {
        const string ScenePath = "Assets/Scenes/Act1Slice.unity";

        [MenuItem("Il Lungo Viaggio/Rigenera scena slice")]
        public static void BuildSlice()
        {
            System.IO.Directory.CreateDirectory("Assets/Scenes");
            System.IO.Directory.CreateDirectory("Assets/Resources");

            var scene = EditorSceneManager.NewScene(
                NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);

            var bootstrap = new GameObject("Bootstrap");
            bootstrap.AddComponent<IlLungoViaggio.SceneBootstrap>();

            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene, ScenePath);

            EditorBuildSettings.scenes = new[]
            {
                new EditorBuildSettingsScene(ScenePath, true)
            };

            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
            Debug.Log($"[SliceSceneBuilder] Scena generata: {ScenePath}");
        }
    }
}
