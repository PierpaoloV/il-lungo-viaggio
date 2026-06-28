using System;
using System.IO;
using UnityEngine;
using IlLungoViaggio.Core;

namespace IlLungoViaggio
{
    /// <summary>
    /// Persiste lo stato di gioco su disco (Application.persistentDataPath/save.json).
    /// Salva due pezzi indipendenti:
    ///   - inkStateJson : stringa opaca prodotta da InkDriver.SaveState()
    ///   - GameState    : flag narrativi, serializzati tramite GameState.ToJson()
    ///
    /// Il contenitore su disco e' un JSON prodotto da JsonUtility, con due campi
    /// stringa. Questo garantisce un escaping corretto anche quando i payload
    /// contengono virgolette o caratteri speciali.
    /// </summary>
    public static class SaveSystem
    {
        // ── Costanti ──────────────────────────────────────────────────────────

        private const string SaveFileName = "save.json";

        // Path calcolato una volta sola (Application.persistentDataPath e'
        // disponibile solo a runtime; l'accesso e' thread-safe in Unity 6).
        private static string SaveFilePath =>
            Path.Combine(Application.persistentDataPath, SaveFileName);

        // ── Contenitore serializzabile ────────────────────────────────────────

        /// <summary>
        /// Wrapper JSON scritto su disco.
        /// inkStateJson : output grezzo di InkDriver.SaveState()
        /// gameStateJson: output di GameState.ToJson()
        /// </summary>
        [Serializable]
        private class SaveContainer
        {
            public string inkStateJson  = string.Empty;
            public string gameStateJson = string.Empty;
        }

        // ── API pubblica ──────────────────────────────────────────────────────

        /// <summary>
        /// Salva lo stato su disco, sovrascrivendo qualsiasi salvataggio precedente.
        /// Lancia eccezione solo su errori I/O gravi (disco pieno, permessi, ecc.).
        /// </summary>
        public static void Save(string inkStateJson, GameState state)
        {
            if (state == null) throw new ArgumentNullException(nameof(state));

            var container = new SaveContainer
            {
                inkStateJson  = inkStateJson ?? string.Empty,
                gameStateJson = state.ToJson()
            };

            string json = JsonUtility.ToJson(container, prettyPrint: false);
            File.WriteAllText(SaveFilePath, json);
        }

        /// <summary>
        /// Ritorna true se esiste un file di salvataggio non vuoto e leggibile.
        /// Non lancia mai eccezione.
        /// </summary>
        public static bool HasSave()
        {
            try
            {
                return File.Exists(SaveFilePath) &&
                       new FileInfo(SaveFilePath).Length > 0;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Tenta di caricare il salvataggio.
        /// Ritorna true e popola i parametri out in caso di successo.
        /// Ritorna false (con valori di default) se il file e' mancante, vuoto
        /// o corrotto — senza mai lanciare eccezione.
        /// </summary>
        public static bool TryLoad(out string inkStateJson, out GameState state)
        {
            inkStateJson = string.Empty;
            state        = new GameState();

            try
            {
                if (!File.Exists(SaveFilePath))
                    return false;

                string json = File.ReadAllText(SaveFilePath);
                if (string.IsNullOrWhiteSpace(json))
                    return false;

                SaveContainer container = JsonUtility.FromJson<SaveContainer>(json);
                if (container == null)
                    return false;

                // GameState.FromJson ritorna un nuovo GameState() in caso di
                // payload malformato — non lancia mai.
                GameState loaded = GameState.FromJson(container.gameStateJson);

                inkStateJson = container.inkStateJson ?? string.Empty;
                state        = loaded;
                return true;
            }
            catch (Exception ex)
            {
                Debug.LogWarning($"[SaveSystem] TryLoad fallito: {ex.Message}");
                return false;
            }
        }

        /// <summary>
        /// Cancella il file di salvataggio se esiste.
        /// Non lancia mai eccezione.
        /// </summary>
        public static void Delete()
        {
            try
            {
                if (File.Exists(SaveFilePath))
                    File.Delete(SaveFilePath);
            }
            catch (Exception ex)
            {
                Debug.LogWarning($"[SaveSystem] Delete fallito: {ex.Message}");
            }
        }
    }
}
