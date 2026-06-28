using System.Collections;
using System.Collections.Generic;
using System.Text;
using UnityEngine;
using IlLungoViaggio.Core;

namespace IlLungoViaggio
{
    /// <summary>
    /// Cuore del prologo a terminale: collega InkDriver (storia/scelte/flag),
    /// TerminalView (UI) e MusicManager. v1 guidata dalle scelte ink (bottoni),
    /// con input testuale che le seleziona (numero, testo, "aiuto"). La parità
    /// completa col parser libero del web è un follow-up.
    /// </summary>
    public class PrologueController : MonoBehaviour
    {
        TerminalView _terminal;
        MusicManager _music;
        InkDriver _driver;
        Coroutine _advanceRoutine;
        bool _ended;

        [SerializeField, Range(20f, 120f)]
        float charactersPerSecond = 42f;

        [SerializeField, Range(0.1f, 1f)]
        float lineRevealDelay = 0.35f;

        public void Init(TerminalView terminal, MusicManager music)
        {
            _terminal = terminal;
            _music = music;

            var ta = Resources.Load<TextAsset>("prologo");
            if (ta == null) { Debug.LogError("Resources/prologo mancante"); return; }
            _driver = new InkDriver(ta.text);

            _terminal.OnChoice += OnChoice;
            _terminal.OnCommand += OnCommand;
            _terminal.SetInputActive(false);

            if (GameFlow.Resume && SaveSystem.HasSave()
                && SaveSystem.TryLoad(out var inkState, out _))
            {
                _driver.LoadState(inkState);
            }

            Advance();
        }

        // ---- Avanzamento storia ------------------------------------------

        void Advance()
        {
            if (_advanceRoutine == null)
                _advanceRoutine = StartCoroutine(RevealUntilChoice());
        }

        IEnumerator RevealUntilChoice()
        {
            bool hasPrintedLine = false;
            while (_driver.CanContinue)
            {
                string line = _driver.Continue();
                string speaker = ApplyTags(_driver.CurrentTags);
                if (string.IsNullOrWhiteSpace(line)) continue;

                string[] lines = line.Replace("\r\n", "\n")
                    .Replace('\r', '\n')
                    .Split('\n');
                foreach (string rawLine in lines)
                {
                    string visibleLine = rawLine.Trim();
                    if (visibleLine.Length == 0) continue;

                    if (hasPrintedLine)
                        yield return new WaitForSecondsRealtime(lineRevealDelay);

                    yield return _terminal.PrintAnimated(
                        visibleLine, charactersPerSecond, speaker);
                    hasPrintedLine = true;
                }
            }

            _advanceRoutine = null;
            if (_driver.HasChoices)
            {
                ShowChoices();
                _terminal.SetInputActive(true);
            }
            else EndPrologue();
        }

        void ShowChoices()
        {
            var list = new List<KeyValuePair<string, int>>();
            var choices = _driver.CurrentChoices;
            for (int i = 0; i < choices.Count; i++)
                list.Add(new KeyValuePair<string, int>(choices[i].text, i));
            _terminal.ShowChoices(list);
        }

        void OnChoice(int index)
        {
            if (_ended) return;
            var choices = _driver.CurrentChoices;
            if (index < 0 || index >= choices.Count) return;

            _terminal.SetInputActive(false);
            _terminal.PrintSystem("> " + choices[index].text);
            _terminal.ClearChoices();
            _driver.Choose(index);
            Advance();
        }

        // ---- Input testuale ----------------------------------------------

        void OnCommand(string text)
        {
            if (_ended) return;
            string norm = Normalize(text);

            if (norm == "aiuto" || norm == "?" || norm == "comandi")
            {
                _terminal.PrintSystem("Azioni: " + DescribeChoices());
                return;
            }
            if (int.TryParse(norm, out int n)
                && n >= 1 && n <= _driver.CurrentChoices.Count)
            {
                OnChoice(n - 1);
                return;
            }
            int idx = MatchChoice(norm);
            if (idx >= 0) { OnChoice(idx); return; }

            _terminal.PrintSystem("Non capisco. Scrivi \"aiuto\" o scegli un'azione.");
        }

        int MatchChoice(string norm)
        {
            var choices = _driver.CurrentChoices;
            for (int i = 0; i < choices.Count; i++)
                if (Normalize(choices[i].text) == norm) return i;
            if (norm.Length >= 3)
                for (int i = 0; i < choices.Count; i++)
                    if (Normalize(choices[i].text).Contains(norm)) return i;
            return -1;
        }

        string DescribeChoices()
        {
            var sb = new StringBuilder();
            var choices = _driver.CurrentChoices;
            for (int i = 0; i < choices.Count; i++)
            {
                if (i > 0) sb.Append("   ");
                sb.Append((i + 1)).Append(") ").Append(choices[i].text);
            }
            return sb.ToString();
        }

        // ---- Tag (dream mode) --------------------------------------------

        string ApplyTags(List<string> tags)
        {
            string speaker = null;
            if (tags == null) return speaker;
            foreach (var t in tags)
            {
                int colon = t.IndexOf(':');
                if (colon <= 0) continue;
                string key = t.Substring(0, colon).Trim();
                string val = t.Substring(colon + 1).Trim();
                if (key == "mode")
                {
                    bool dream = val == "dream";
                    _terminal.SetDreamMode(dream);
                    if (_music != null) _music.SetDreamMood(dream);
                }
                else if (key == "voce") speaker = val;
            }
            return speaker;
        }

        // ---- Fine prologo + handoff --------------------------------------

        void EndPrologue()
        {
            _ended = true;
            _terminal.ClearChoices();
            _terminal.SetInputActive(false);
            SaveSystem.Save(_driver.SaveState(), new GameState());

            _terminal.PrintSystem("");
            _terminal.PrintSystem("— Fine del Prologo —");

            _terminal.OnChoice -= OnChoice;
            _terminal.OnChoice += OnContinue;
            _terminal.ShowChoices(new List<KeyValuePair<string, int>>
            {
                new KeyValuePair<string, int>("Continua →", 0)
            });
        }

        void OnContinue(int id)
        {
            _terminal.OnChoice -= OnContinue;
            GameFlow.LoadAct1();
        }

        static string Normalize(string s)
        {
            if (s == null) return "";
            s = s.Trim().ToLowerInvariant();
            var sb = new StringBuilder();
            foreach (char c in s)
                if (char.IsLetterOrDigit(c) || c == ' ') sb.Append(c);
            return sb.ToString().Trim();
        }
    }
}
