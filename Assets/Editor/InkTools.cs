using Ink.UnityIntegration;
using UnityEditor;
using UnityEngine;

namespace IlLungoViaggio.EditorTools
{
    /// <summary>
    /// Compila prologo.ink in JSON in modo SINCRONO (in batchmode la
    /// compilazione automatica è asincrona e non fa in tempo prima del -quit).
    ///   -executeMethod IlLungoViaggio.EditorTools.InkTools.RecompileInk
    /// </summary>
    public static class InkTools
    {
        const string InkPath = "Assets/Ink/prologo.ink";
        const string JsonPath = "Assets/Ink/prologo.json";

        /// <summary>
        /// Carica il JSON compilato con la runtime ink e legge le prime righe.
        /// Verifica end-to-end: compila Core+InkDriver+runtime e prova l'ink.
        ///   -executeMethod IlLungoViaggio.EditorTools.InkTools.SmokeInk
        /// </summary>
        public static void SmokeInk()
        {
            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(JsonPath);
            if (ta == null) { Debug.LogError("[InkSmoke] prologo.json mancante"); return; }

            var driver = new IlLungoViaggio.InkDriver(ta.text);
            var sb = new System.Text.StringBuilder();
            int n = 0;
            while (driver.CanContinue && n < 6) { sb.Append(driver.Continue()); n++; }
            var preview = sb.ToString().Replace("\n", " ");
            if (preview.Length > 160) preview = preview.Substring(0, 160);
            Debug.Log($"[InkSmoke] OK. righe={n} scelte={driver.CurrentChoices.Count} " +
                      $"preview=\"{preview}\"");
        }

        public static void RecompileInk()
        {
            AssetDatabase.Refresh();
            InkLibrary.Rebuild();

            var inkFile = InkLibrary.GetInkFileWithPath(InkPath);
            if (inkFile == null)
            {
                Debug.LogError($"[InkTools] InkFile non trovato per {InkPath}");
                return;
            }

            InkCompiler.CompileInk(new[] { inkFile }, true, null); // immediate
            AssetDatabase.Refresh();

            var json = AssetDatabase.LoadAssetAtPath<TextAsset>(JsonPath);
            Debug.Log($"[InkTools] prologo.json presente={json != null} " +
                      $"len={(json != null ? json.text.Length : 0)}");
        }
    }
}
