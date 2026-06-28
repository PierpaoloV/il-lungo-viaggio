using UnityEditor;
using UnityEngine;

namespace IlLungoViaggio.EditorTools
{
    /// <summary>
    /// Build headless della vertical-slice, usata come verifica end-to-end:
    ///   Unity -projectPath ... -batchmode -quit \
    ///         -executeMethod IlLungoViaggio.EditorTools.SliceBuilder.BuildOSX
    /// Il percorso di output si passa con -buildOut &lt;path&gt;.
    /// </summary>
    public static class SliceBuilder
    {
        public static void BuildOSX()
        {
            string outPath = "Build/IlLungoViaggio.app";
            var args = System.Environment.GetCommandLineArgs();
            for (int i = 0; i < args.Length - 1; i++)
                if (args[i] == "-buildOut") outPath = args[i + 1];

            var scenes = new System.Collections.Generic.List<string>();
            foreach (var s in EditorBuildSettings.scenes)
                if (s.enabled) scenes.Add(s.path);
            if (scenes.Count == 0) scenes.Add("Assets/Scenes/Act1Slice.unity");

            var opts = new BuildPlayerOptions
            {
                scenes = scenes.ToArray(),
                locationPathName = outPath,
                target = BuildTarget.StandaloneOSX,
                options = BuildOptions.None
            };

            var report = BuildPipeline.BuildPlayer(opts);
            var summary = report.summary;
            Debug.Log($"[SliceBuilder] Result={summary.result} " +
                      $"Errors={summary.totalErrors} Size={summary.totalSize} " +
                      $"Out={outPath}");

            if (summary.result != UnityEditor.Build.Reporting.BuildResult.Succeeded)
                EditorApplication.Exit(1);
        }
    }
}
