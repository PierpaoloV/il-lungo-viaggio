using UnityEditor;
using UnityEngine;

namespace IlLungoViaggio.EditorTools
{
    /// <summary>
    /// Smoke test: carica il JSON ink compilato (Resources/prologo) con la
    /// runtime e legge le prime righe. Verifica end-to-end Core+InkDriver+runtime.
    /// L'ink si (ri)compila esternamente con: node tools/compile-ink.mjs
    ///   -executeMethod IlLungoViaggio.EditorTools.InkTools.SmokeInk
    /// </summary>
    public static class InkTools
    {
        public static void SmokeInk()
        {
            var ta = Resources.Load<TextAsset>("prologo");
            if (ta == null) { Debug.LogError("[InkSmoke] Resources/prologo mancante"); return; }

            var driver = new IlLungoViaggio.InkDriver(ta.text);
            var sb = new System.Text.StringBuilder();
            int n = 0;
            while (driver.CanContinue && n < 6) { sb.Append(driver.Continue()); n++; }
            var preview = sb.ToString().Replace("\n", " ");
            if (preview.Length > 160) preview = preview.Substring(0, 160);
            Debug.Log($"[InkSmoke] OK. righe={n} scelte={driver.CurrentChoices.Count} " +
                      $"preview=\"{preview}\"");
        }
    }
}
