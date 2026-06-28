using UnityEditor;
using UnityEngine;

namespace IlLungoViaggio.EditorTools
{
    /// <summary>
    /// Imposta i PNG in Resources come Sprite (di default Unity li importa come
    /// Texture, e Resources.Load&lt;Sprite&gt; tornerebbe null). Eseguibile da CLI:
    ///   -executeMethod IlLungoViaggio.EditorTools.AssetSetup.ConfigureArt
    /// </summary>
    public static class AssetSetup
    {
        static readonly string[] Sprites =
        {
            "Assets/Resources/ernesto.png",
            "Assets/Resources/scene-bg.png",
        };

        [MenuItem("Il Lungo Viaggio/Configura arte (sprite)")]
        public static void ConfigureArt()
        {
            foreach (var path in Sprites) SetAsSprite(path);
            AssetDatabase.Refresh();

            var e = Resources.Load<Sprite>("ernesto");
            var b = Resources.Load<Sprite>("scene-bg");
            Debug.Log($"[AssetSetup] ernesto sprite caricato={e != null}, " +
                      $"scene-bg sprite caricato={b != null}");
        }

        static void SetAsSprite(string path)
        {
            var imp = AssetImporter.GetAtPath(path) as TextureImporter;
            if (imp == null)
            {
                Debug.LogWarning($"[AssetSetup] nessun importer per {path}");
                return;
            }
            imp.textureType = TextureImporterType.Sprite;
            imp.spriteImportMode = SpriteImportMode.Single;
            imp.alphaIsTransparency = true;
            imp.alphaSource = TextureImporterAlphaSource.FromInput;
            imp.SaveAndReimport();
        }
    }
}
