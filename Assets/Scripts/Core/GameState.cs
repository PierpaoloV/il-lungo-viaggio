using System;
using System.Collections.Generic;
using System.Text;

namespace IlLungoViaggio.Core
{
    /// <summary>
    /// Modello di stato del prologo di Il Lungo Viaggio.
    /// Tutti i flag VAR dell'ink + dizionario generico per variabili extra.
    /// Serializza/deserializza in JSON hand-rolled (niente System.Text.Json,
    /// niente UnityEngine). L'I/O su file o PlayerPrefs e' compito di un modulo
    /// Unity separato che chiamera' ToJson/FromJson.
    /// </summary>
    public sealed class GameState
    {
        // ── Bool flags ────────────────────────────────────────────────────────
        public bool LeggendaAscoltata          { get; set; }
        public bool BoscoTracceOsservate       { get; set; }
        public bool AcumeVivo                  { get; set; }
        public bool PaninoDato                 { get; set; }
        public bool VecchioAccompagnato        { get; set; }
        public bool RimorsoTornato             { get; set; }
        public bool DialogoErrolRicevuto       { get; set; }
        public bool VecchioHaNominatoSpada     { get; set; }
        public bool LesmidoomRivelato          { get; set; }
        public bool FaiBuonViaggioSentito      { get; set; }
        public bool OrcoAllarme                { get; set; }
        public bool SognoRianimato             { get; set; }
        public bool MedaglioneErrolPreso       { get; set; }
        public bool SpadaLungoViaggioRecuperata{ get; set; }
        public bool SpadaConsegnataErrol       { get; set; }
        public bool SegnoNotato                { get; set; }
        public bool PrologoCompletato          { get; set; }

        // ── Int flags ─────────────────────────────────────────────────────────
        public int StatEmpatia  { get; set; }
        public int StatCoraggio { get; set; }
        public int StatAcume    { get; set; }

        // ── String flags ──────────────────────────────────────────────────────
        public string AiutoVecchio           { get; set; } = "";
        public string SeedCuriositaVecchio   { get; set; } = "bassa";
        public string SeedMostroAffamato     { get; set; } = "";
        public string ColpoTutorial          { get; set; } = "nessuno";
        public string SognoPrimoScontro      { get; set; } = "saltato";
        public string RinforziPostOrco       { get; set; } = "non_applicabile";
        public string SognoBivio             { get; set; } = "";
        public string SognoPerdite           { get; set; } = "";
        public string SeedCuriositaSegno     { get; set; } = "";

        // ── Generic extra ink variables ───────────────────────────────────────
        public Dictionary<string, string> Extra { get; set; } = new Dictionary<string, string>();

        // ─────────────────────────────────────────────────────────────────────
        // Serializzazione
        // ─────────────────────────────────────────────────────────────────────

        public string ToJson()
        {
            var sb = new StringBuilder();
            sb.Append('{');

            // version sentinel
            sb.Append("\"version\":1");

            AppendBool(sb, "leggenda_ascoltata",           LeggendaAscoltata);
            AppendBool(sb, "bosco_tracce_osservate",       BoscoTracceOsservate);
            AppendBool(sb, "acume_vivo",                   AcumeVivo);
            AppendBool(sb, "panino_dato",                  PaninoDato);
            AppendBool(sb, "vecchio_accompagnato",         VecchioAccompagnato);
            AppendBool(sb, "rimorso_tornato",              RimorsoTornato);
            AppendBool(sb, "dialogo_errol_ricevuto",       DialogoErrolRicevuto);
            AppendBool(sb, "vecchio_ha_nominato_spada",    VecchioHaNominatoSpada);
            AppendBool(sb, "lesmidoom_rivelato",           LesmidoomRivelato);
            AppendBool(sb, "fai_buon_viaggio_sentito",     FaiBuonViaggioSentito);
            AppendBool(sb, "orco_allarme",                 OrcoAllarme);
            AppendBool(sb, "sogno_rianimato",              SognoRianimato);
            AppendBool(sb, "medaglione_errol_preso",       MedaglioneErrolPreso);
            AppendBool(sb, "spada_lungo_viaggio_recuperata", SpadaLungoViaggioRecuperata);
            AppendBool(sb, "spada_consegnata_errol",       SpadaConsegnataErrol);
            AppendBool(sb, "segno_notato",                 SegnoNotato);
            AppendBool(sb, "prologo_completato",           PrologoCompletato);

            AppendInt(sb, "stat_empatia",  StatEmpatia);
            AppendInt(sb, "stat_coraggio", StatCoraggio);
            AppendInt(sb, "stat_acume",    StatAcume);

            AppendStr(sb, "aiuto_vecchio",           AiutoVecchio);
            AppendStr(sb, "seed_curiosita_vecchio",  SeedCuriositaVecchio);
            AppendStr(sb, "seed_mostro_affamato",    SeedMostroAffamato);
            AppendStr(sb, "colpo_tutorial",          ColpoTutorial);
            AppendStr(sb, "sogno_primo_scontro",     SognoPrimoScontro);
            AppendStr(sb, "rinforzi_post_orco",      RinforziPostOrco);
            AppendStr(sb, "sogno_bivio",             SognoBivio);
            AppendStr(sb, "sogno_perdite",           SognoPerdite);
            AppendStr(sb, "seed_curiosita_segno",    SeedCuriositaSegno);

            // Extra nested object
            sb.Append(",\"extra\":{");
            bool firstExtra = true;
            foreach (System.Collections.Generic.KeyValuePair<string, string> kvp in Extra)
            {
                if (!firstExtra) sb.Append(',');
                sb.Append('"').Append(EscapeJson(kvp.Key)).Append("\":\"")
                  .Append(EscapeJson(kvp.Value)).Append('"');
                firstExtra = false;
            }
            sb.Append('}');

            sb.Append('}');
            return sb.ToString();
        }

        public static GameState FromJson(string json)
        {
            if (string.IsNullOrWhiteSpace(json))
                return new GameState();

            try
            {
                Dictionary<string, string> d = MiniJson.ParseObject(json);

                if (!d.TryGetValue("version", out string ver) || ver != "1")
                    return new GameState();

                GameState gs = new GameState();

                gs.LeggendaAscoltata           = ReadBool(d, "leggenda_ascoltata");
                gs.BoscoTracceOsservate        = ReadBool(d, "bosco_tracce_osservate");
                gs.AcumeVivo                   = ReadBool(d, "acume_vivo");
                gs.PaninoDato                  = ReadBool(d, "panino_dato");
                gs.VecchioAccompagnato         = ReadBool(d, "vecchio_accompagnato");
                gs.RimorsoTornato              = ReadBool(d, "rimorso_tornato");
                gs.DialogoErrolRicevuto        = ReadBool(d, "dialogo_errol_ricevuto");
                gs.VecchioHaNominatoSpada      = ReadBool(d, "vecchio_ha_nominato_spada");
                gs.LesmidoomRivelato           = ReadBool(d, "lesmidoom_rivelato");
                gs.FaiBuonViaggioSentito       = ReadBool(d, "fai_buon_viaggio_sentito");
                gs.OrcoAllarme                 = ReadBool(d, "orco_allarme");
                gs.SognoRianimato              = ReadBool(d, "sogno_rianimato");
                gs.MedaglioneErrolPreso        = ReadBool(d, "medaglione_errol_preso");
                gs.SpadaLungoViaggioRecuperata = ReadBool(d, "spada_lungo_viaggio_recuperata");
                gs.SpadaConsegnataErrol        = ReadBool(d, "spada_consegnata_errol");
                gs.SegnoNotato                 = ReadBool(d, "segno_notato");
                gs.PrologoCompletato           = ReadBool(d, "prologo_completato");

                gs.StatEmpatia  = ReadInt(d, "stat_empatia");
                gs.StatCoraggio = ReadInt(d, "stat_coraggio");
                gs.StatAcume    = ReadInt(d, "stat_acume");

                gs.AiutoVecchio           = ReadStr(d, "aiuto_vecchio",           "");
                gs.SeedCuriositaVecchio   = ReadStr(d, "seed_curiosita_vecchio",  "bassa");
                gs.SeedMostroAffamato     = ReadStr(d, "seed_mostro_affamato",    "");
                gs.ColpoTutorial          = ReadStr(d, "colpo_tutorial",          "nessuno");
                gs.SognoPrimoScontro      = ReadStr(d, "sogno_primo_scontro",     "saltato");
                gs.RinforziPostOrco       = ReadStr(d, "rinforzi_post_orco",      "non_applicabile");
                gs.SognoBivio             = ReadStr(d, "sogno_bivio",             "");
                gs.SognoPerdite           = ReadStr(d, "sogno_perdite",           "");
                gs.SeedCuriositaSegno     = ReadStr(d, "seed_curiosita_segno",    "");

                if (d.TryGetValue("extra", out string extraRaw))
                {
                    Dictionary<string, string> extraDict = MiniJson.ParseObject(extraRaw);
                    foreach (System.Collections.Generic.KeyValuePair<string, string> kvp in extraDict)
                        gs.Extra[kvp.Key] = kvp.Value;
                }

                return gs;
            }
            catch
            {
                return new GameState();
            }
        }

        // ── Private serialization helpers ─────────────────────────────────────

        private static void AppendBool(StringBuilder sb, string key, bool value)
        {
            sb.Append(",\"").Append(key).Append("\":").Append(value ? "true" : "false");
        }

        private static void AppendInt(StringBuilder sb, string key, int value)
        {
            sb.Append(",\"").Append(key).Append("\":").Append(value);
        }

        private static void AppendStr(StringBuilder sb, string key, string value)
        {
            sb.Append(",\"").Append(key).Append("\":\"").Append(EscapeJson(value)).Append('"');
        }

        private static string EscapeJson(string s)
        {
            if (s == null) return "";
            var sb = new StringBuilder(s.Length + 4);
            foreach (char c in s)
            {
                switch (c)
                {
                    case '"':  sb.Append("\\\""); break;
                    case '\\': sb.Append("\\\\"); break;
                    case '\n': sb.Append("\\n");  break;
                    case '\r': sb.Append("\\r");  break;
                    case '\t': sb.Append("\\t");  break;
                    default:   sb.Append(c);      break;
                }
            }
            return sb.ToString();
        }

        private static bool ReadBool(Dictionary<string, string> d, string key)
        {
            return d.TryGetValue(key, out string v) && v == "true";
        }

        private static int ReadInt(Dictionary<string, string> d, string key)
        {
            if (d.TryGetValue(key, out string v) && int.TryParse(v, out int n))
                return n;
            return 0;
        }

        private static string ReadStr(Dictionary<string, string> d, string key, string def)
        {
            return d.TryGetValue(key, out string v) ? v : def;
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Minimal JSON parser — solo BCL, solo C# 9
    // Parsifica oggetti piatti { "k": <value> } dove il valore puo' essere:
    //   true/false, un intero, una stringa JSON, o un oggetto annidato (raw).
    // I valori vengono restituiti come stringhe:
    //   bool  → "true" / "false"
    //   int   → stringa decimale
    //   str   → testo unescaped
    //   obj   → JSON raw dell'oggetto annidato
    // ─────────────────────────────────────────────────────────────────────────
    internal static class MiniJson
    {
        public static Dictionary<string, string> ParseObject(string json)
        {
            var result = new Dictionary<string, string>();
            if (string.IsNullOrWhiteSpace(json)) return result;

            int i = SkipWs(json, 0);
            if (i >= json.Length || json[i] != '{') return result;
            i++; // skip '{'

            while (true)
            {
                i = SkipWs(json, i);
                if (i >= json.Length || json[i] == '}') break;
                if (json[i] == ',') { i++; continue; }
                if (json[i] != '"') break; // malformed

                string key;
                (key, i) = ReadString(json, i);

                i = SkipWs(json, i);
                if (i >= json.Length || json[i] != ':') break;
                i++;
                i = SkipWs(json, i);
                if (i >= json.Length) break;

                string value;
                (value, i) = ReadValue(json, i);

                result[key] = value;
            }

            return result;
        }

        private static (string value, int next) ReadValue(string json, int i)
        {
            char c = json[i];

            if (c == '"')
                return ReadString(json, i);

            if (c == '{')
            {
                // Return raw JSON of nested object (for "extra")
                int start = i;
                int depth = 0;
                while (i < json.Length)
                {
                    char ch = json[i];
                    if (ch == '"')
                    {
                        // skip over the string so braces inside don't count
                        (_, i) = ReadString(json, i);
                        continue;
                    }
                    if (ch == '{') { depth++; i++; }
                    else if (ch == '}') { depth--; i++; if (depth == 0) break; }
                    else { i++; }
                }
                return (json.Substring(start, i - start), i);
            }

            // Literal: true, false, null, number
            int s = i;
            while (i < json.Length)
            {
                char ch = json[i];
                if (ch == ',' || ch == '}' || ch == ']' || char.IsWhiteSpace(ch)) break;
                i++;
            }
            return (json.Substring(s, i - s), i);
        }

        private static (string value, int next) ReadString(string json, int i)
        {
            i++; // skip opening '"'
            var sb = new StringBuilder();
            while (i < json.Length)
            {
                char c = json[i];
                if (c == '"') { i++; break; }
                if (c == '\\')
                {
                    i++;
                    if (i >= json.Length) break;
                    char esc = json[i];
                    switch (esc)
                    {
                        case '"':  sb.Append('"');  break;
                        case '\\': sb.Append('\\'); break;
                        case 'n':  sb.Append('\n'); break;
                        case 'r':  sb.Append('\r'); break;
                        case 't':  sb.Append('\t'); break;
                        case '/':  sb.Append('/');  break;
                        default:   sb.Append(esc);  break;
                    }
                    i++;
                    continue;
                }
                sb.Append(c);
                i++;
            }
            return (sb.ToString(), i);
        }

        private static int SkipWs(string json, int i)
        {
            while (i < json.Length && char.IsWhiteSpace(json[i])) i++;
            return i;
        }
    }
}
