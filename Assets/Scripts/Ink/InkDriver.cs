using System.Collections.Generic;
using System.Text;
using Ink.Runtime;

namespace IlLungoViaggio
{
    /// <summary>
    /// Wrapper C# attorno a Ink.Runtime.Story: guida il prologo (testo, tag,
    /// scelte, variabili/flag, save/load dello stato). È lato Unity perché
    /// dipende dalla runtime ink del pacchetto ink-unity-integration.
    /// </summary>
    public class InkDriver
    {
        readonly Story _story;

        public InkDriver(string compiledJson)
        {
            _story = new Story(compiledJson);
        }

        public bool CanContinue => _story.canContinue;
        public string CurrentText => _story.currentText;
        public List<string> CurrentTags => _story.currentTags;
        public List<Choice> CurrentChoices => _story.currentChoices;
        public bool HasChoices => _story.currentChoices.Count > 0;

        /// <summary>Avanza di una riga e ritorna il testo.</summary>
        public string Continue() => _story.Continue();

        /// <summary>Avanza finché può, concatenando il testo (utile per blocchi).</summary>
        public string ContinueMaximally()
        {
            var sb = new StringBuilder();
            while (_story.canContinue) sb.Append(_story.Continue());
            return sb.ToString();
        }

        public void Choose(int index) => _story.ChooseChoiceIndex(index);

        // --- Variabili / flag --------------------------------------------
        public object GetVar(string name) => _story.variablesState[name];
        public void SetVar(string name, object value) => _story.variablesState[name] = value;

        public bool GetBool(string name) => _story.variablesState[name] is bool b && b;
        public int GetInt(string name)
            => _story.variablesState[name] is int i ? i : 0;
        public string GetString(string name)
            => _story.variablesState[name] as string ?? "";

        // --- Save / load dello stato narrativo ---------------------------
        public string SaveState() => _story.state.ToJson();
        public void LoadState(string json) => _story.state.LoadJson(json);

        /// <summary>Osserva una variabile ink (callback ad ogni cambiamento).</summary>
        public void ObserveVariable(string name, Story.VariableObserver observer)
            => _story.ObserveVariable(name, observer);
    }
}
