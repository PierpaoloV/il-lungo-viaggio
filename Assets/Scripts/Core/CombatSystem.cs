using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace IlLungoViaggio.Core
{
    // ────────────────────────── Types ──────────────────────────

    public enum CombatId
    {
        TutorialOrcoSpada,
        ScontroTreNemiciInitial,
        ScontroTreNemiciRinforzi
    }

    public enum OpeningId
    {
        Ginocchia,
        Fianco,
        Braccio
    }

    public class CombatFlagPatch
    {
        public string Name { get; }
        public object Value { get; }

        public CombatFlagPatch(string name, object value)
        {
            Name = name;
            Value = value;
        }
    }

    public class CombatState
    {
        public CombatId EncounterId { get; }
        public bool Alerted { get; }
        public int Errors { get; }
        public IReadOnlyList<OpeningId> RemainingOpenings { get; }
        public bool Completed { get; }

        public CombatState(
            CombatId encounterId,
            bool alerted,
            int errors,
            IReadOnlyList<OpeningId> remainingOpenings,
            bool completed)
        {
            EncounterId = encounterId;
            Alerted = alerted;
            Errors = errors;
            RemainingOpenings = remainingOpenings;
            Completed = completed;
        }

        public CombatState With(
            bool? alerted = null,
            int? errors = null,
            IReadOnlyList<OpeningId> remainingOpenings = null,
            bool? completed = null)
        {
            return new CombatState(
                EncounterId,
                alerted ?? Alerted,
                errors ?? Errors,
                remainingOpenings ?? RemainingOpenings,
                completed ?? Completed);
        }
    }

    public class CombatOpeningView
    {
        public OpeningId Id { get; }
        public string Label { get; }
        public string Clue { get; }

        public CombatOpeningView(OpeningId id, string label, string clue)
        {
            Id = id;
            Label = label;
            Clue = clue;
        }
    }

    public class CombatView
    {
        public CombatId EncounterId { get; }
        public string Title { get; }
        public string ObserveText { get; }
        public IReadOnlyList<CombatOpeningView> Openings { get; }
        public IReadOnlyList<string> Choices { get; }

        public CombatView(
            CombatId encounterId,
            string title,
            string observeText,
            IReadOnlyList<CombatOpeningView> openings,
            IReadOnlyList<string> choices)
        {
            EncounterId = encounterId;
            Title = title;
            ObserveText = observeText;
            Openings = openings;
            Choices = choices;
        }
    }

    public enum CombatOutcome
    {
        None,
        TutorialClean,
        TutorialAlerted,
        ThreeEnemiesVictory,
        SoftDefeat
    }

    public enum CombatStatus
    {
        Ongoing,
        Completed
    }

    public class CombatStepResult
    {
        public CombatState State { get; }
        public IReadOnlyList<string> Lines { get; }
        public IReadOnlyList<CombatFlagPatch> Flags { get; }
        public CombatStatus Status { get; }
        public CombatOutcome Outcome { get; }

        public CombatStepResult(
            CombatState state,
            IReadOnlyList<string> lines,
            IReadOnlyList<CombatFlagPatch> flags,
            CombatStatus status,
            CombatOutcome outcome = CombatOutcome.None)
        {
            State = state;
            Lines = lines;
            Flags = flags;
            Status = status;
            Outcome = outcome;
        }
    }

    public class CombatParserObject
    {
        public string Id { get; }
        public string Label { get; }
        public IReadOnlyList<string> Aliases { get; }

        public CombatParserObject(string id, string label, IReadOnlyList<string> aliases)
        {
            Id = id;
            Label = label;
            Aliases = aliases;
        }
    }

    // ────────────────────────── Static Data ──────────────────────────

    internal static class CombatData
    {
        internal static readonly Dictionary<OpeningId, string[]> OpeningAliases =
            new Dictionary<OpeningId, string[]>
            {
                [OpeningId.Ginocchia] = new[] { "ginocchia", "ginocchio", "gambe", "gamba" },
                [OpeningId.Fianco]    = new[] { "fianco", "lato", "torace", "cuore" },
                [OpeningId.Braccio]  = new[] { "braccio", "braccia", "arto", "arma" }
            };

        internal static readonly Dictionary<OpeningId, string> OpeningClues =
            new Dictionary<OpeningId, string>
            {
                [OpeningId.Ginocchia] = "Le ginocchia cedono a ogni passo: se colpisci basso, il nemico perde equilibrio.",
                [OpeningId.Fianco]    = "Il fianco resta scoperto quando la lama si alza: la guardia e' troppo larga.",
                [OpeningId.Braccio]  = "Il braccio armato resta teso troppo a lungo: puoi spezzare l'attacco prima che cada."
            };

        internal static readonly Dictionary<OpeningId, string> TutorialSuccess =
            new Dictionary<OpeningId, string>
            {
                [OpeningId.Ginocchia] = "Ti abbassi sotto il fendente e tagli basso. La creatura perde la gamba, cade nel fango e la Spada le sfugge dalla mano.",
                [OpeningId.Fianco]    = "Scivoli di lato mentre la lama passa oltre. Il tuo colpo entra nel fianco scoperto e la creatura crolla in ginocchio."
            };

        internal static readonly Dictionary<OpeningId, string> ThreeEnemySuccess =
            new Dictionary<OpeningId, string>
            {
                [OpeningId.Ginocchia] = "Colpisci le ginocchia del primo nemico. Si piega in avanti e sparisce sotto l'urto dei soldati dietro di te.",
                [OpeningId.Fianco]    = "Entri nel fianco del secondo nemico mentre ruota troppo largo. Il varco si apre per un istante.",
                [OpeningId.Braccio]  = "Ferisci il braccio armato del terzo nemico. L'arma cade prima di arrivare su di te."
            };

        internal static readonly Dictionary<CombatId, (string name, string victory, string defeat)> ThreeEnemyResultFlags =
            new Dictionary<CombatId, (string, string, string)>
            {
                [CombatId.ScontroTreNemiciInitial]  = ("sogno_primo_scontro", "vinto",  "rianimato"),
                [CombatId.ScontroTreNemiciRinforzi] = ("rinforzi_post_orco",  "vinti",  "rianimato")
            };

        // Canonical string names for display / serialization
        internal static readonly Dictionary<OpeningId, string> OpeningName =
            new Dictionary<OpeningId, string>
            {
                [OpeningId.Ginocchia] = "ginocchia",
                [OpeningId.Fianco]    = "fianco",
                [OpeningId.Braccio]   = "braccio"
            };

        // parseCombatId lookup: normalized-no-spaces key → CombatId
        internal static readonly Dictionary<string, CombatId> CombatTagAliases =
            new Dictionary<string, CombatId>
            {
                ["tutorialorcospada"]          = CombatId.TutorialOrcoSpada,
                ["tutorialorco"]               = CombatId.TutorialOrcoSpada,
                ["orcotutorial"]               = CombatId.TutorialOrcoSpada,
                ["orcospada"]                  = CombatId.TutorialOrcoSpada,
                ["scontrotrenemiciinitial"]    = CombatId.ScontroTreNemiciInitial,
                ["tre nemici initial"]         = CombatId.ScontroTreNemiciInitial,
                ["tre nemici iniziale"]        = CombatId.ScontroTreNemiciInitial,
                ["tre nemici"]                 = CombatId.ScontroTreNemiciInitial,
                ["scontrotrenemicirinforzi"]   = CombatId.ScontroTreNemiciRinforzi,
                ["tre nemici rinforzi"]        = CombatId.ScontroTreNemiciRinforzi,
                ["rinforzi"]                   = CombatId.ScontroTreNemiciRinforzi
            };
    }

    // ────────────────────────── Main API ──────────────────────────

    public static class CombatSystem
    {
        private static readonly Regex NonLetterNumber = new Regex(
            @"[^\p{L}\p{N}]+",
            RegexOptions.Compiled);

        private static readonly Regex MultiSpace = new Regex(
            @"\s+",
            RegexOptions.Compiled);

        // ── parseCombatId ──────────────────────────────────────────

        /// <summary>
        /// Parses a raw string into a CombatId. Returns null if not recognised.
        /// </summary>
        public static CombatId? ParseCombatId(string value)
        {
            if (value == null) return null;

            // Try canonical names first (original TS identifiers)
            if (value == "TutorialOrcoSpada")           return CombatId.TutorialOrcoSpada;
            if (value == "ScontroTreNemici.initial")    return CombatId.ScontroTreNemiciInitial;
            if (value == "ScontroTreNemici.rinforzi")   return CombatId.ScontroTreNemiciRinforzi;

            var compact = NormalizeCombatText(value).Replace(" ", "");
            var spaced  = NormalizeCombatText(value);

            if (CombatData.CombatTagAliases.TryGetValue(compact, out var byCompact))
                return byCompact;

            if (CombatData.CombatTagAliases.TryGetValue(spaced, out var bySpaced))
                return bySpaced;

            return null;
        }

        // ── startCombat ────────────────────────────────────────────

        public static CombatState StartCombat(CombatId encounterId)
        {
            var openings = encounterId == CombatId.TutorialOrcoSpada
                ? new List<OpeningId> { OpeningId.Ginocchia, OpeningId.Fianco }
                : new List<OpeningId> { OpeningId.Ginocchia, OpeningId.Fianco, OpeningId.Braccio };

            return new CombatState(encounterId, false, 0, openings, false);
        }

        // ── getCombatView ──────────────────────────────────────────

        public static CombatView GetCombatView(CombatState state)
        {
            var openings = state.RemainingOpenings.Select(id => new CombatOpeningView(
                id,
                CombatData.OpeningName[id],
                CombatData.OpeningClues[id]
            )).ToList();

            return new CombatView(
                state.EncounterId,
                state.EncounterId == CombatId.TutorialOrcoSpada ? "Creatura con la Spada" : "Tre nemici",
                FormatObserveText(state),
                openings,
                openings.Select(o => $"attacca {o.Label}").ToList()
            );
        }

        // ── attackCombat ───────────────────────────────────────────

        public static CombatStepResult AttackCombat(CombatState state, string targetText = null)
        {
            if (state.Completed)
            {
                return new CombatStepResult(
                    state,
                    new[] { "Lo scontro e' gia' finito." },
                    Array.Empty<CombatFlagPatch>(),
                    CombatStatus.Completed);
            }

            var opening = FindOpening(state, targetText);

            if (opening == null)
                return RegisterCombatMistake(state);

            return state.EncounterId == CombatId.TutorialOrcoSpada
                ? ResolveTutorialHit(state, opening.Value)
                : ResolveThreeEnemiesHit(state, opening.Value);
        }

        // ── registerCombatMistake ──────────────────────────────────

        public static CombatStepResult RegisterCombatMistake(CombatState state)
        {
            if (state.EncounterId == CombatId.TutorialOrcoSpada)
            {
                if (state.Alerted)
                {
                    return new CombatStepResult(
                        state,
                        new[] { "Il colpo non trova niente. La creatura ha gia' chiamato i rinforzi: ora devi finirla sulle aperture rimaste." },
                        Array.Empty<CombatFlagPatch>(),
                        CombatStatus.Ongoing);
                }

                return new CombatStepResult(
                    state.With(alerted: true, errors: state.Errors + 1),
                    new[]
                    {
                        "Esiti un istante di troppo. La creatura riempie il petto d'aria e urla verso il campo.",
                        "La raggiungi comunque prima che riprenda forza, ma l'allarme e' partito."
                    },
                    new CombatFlagPatch[]
                    {
                        new CombatFlagPatch("orco_allarme", true),
                        new CombatFlagPatch("colpo_tutorial", "maldestro_non_finale")
                    },
                    CombatStatus.Ongoing);
            }

            var errors = state.Errors + 1;

            if (errors >= 2)
            {
                var resultFlag = GetThreeEnemyResultFlag(state.EncounterId);

                return new CombatStepResult(
                    state.With(errors: errors, completed: true),
                    new[]
                    {
                        "Il secondo errore ti costa il respiro. Il campo si rovescia, il rumore diventa acqua scura.",
                        "Quando riapri gli occhi sei di nuovo all'accampamento: vivo, rianimato, senza un game over a chiuderti fuori."
                    },
                    new CombatFlagPatch[]
                    {
                        new CombatFlagPatch("sogno_rianimato", true),
                        new CombatFlagPatch(resultFlag.name, resultFlag.defeat)
                    },
                    CombatStatus.Completed,
                    CombatOutcome.SoftDefeat);
            }

            var nextState = state.With(errors: errors);

            return new CombatStepResult(
                nextState,
                new[]
                {
                    "Il colpo va a vuoto. Il nemico ti spinge indietro e il campo ti ricorda quanto poco spazio resta.",
                    FormatObserveText(nextState)
                },
                Array.Empty<CombatFlagPatch>(),
                CombatStatus.Ongoing);
        }

        // ── getCombatParserObjects ─────────────────────────────────

        public static IReadOnlyList<CombatParserObject> GetCombatParserObjects(CombatState state)
        {
            var enemy = state.EncounterId == CombatId.TutorialOrcoSpada
                ? new CombatParserObject("combat_enemy", "la creatura", new[] { "nemico", "creatura", "orco", "avversario" })
                : new CombatParserObject("combat_enemy", "i tre nemici", new[] { "nemico", "nemici", "creature", "orchi", "avversari" });

            var openings = state.RemainingOpenings.Select(o => new CombatParserObject(
                $"combat_opening_{CombatData.OpeningName[o]}",
                CombatData.OpeningName[o],
                CombatData.OpeningAliases[o]
            ));

            return new[] { enemy }.Concat(openings).ToList();
        }

        // ── isCombatObjectId ───────────────────────────────────────

        public static bool IsCombatObjectId(string targetId)
        {
            return targetId == "combat_enemy" || (targetId != null && targetId.StartsWith("combat_opening_"));
        }

        // ── describeCombatTarget ───────────────────────────────────

        public static string DescribeCombatTarget(CombatState state, string targetId = null)
        {
            if (targetId == null || targetId == "combat_enemy")
                return GetCombatView(state).ObserveText;

            var openingName = targetId.Replace("combat_opening_", "");
            var opening = ParseOpeningName(openingName);

            if (opening != null && state.RemainingOpenings.Contains(opening.Value))
                return CombatData.OpeningClues[opening.Value];

            return GetCombatView(state).ObserveText;
        }

        // ────────────────────────── Private ──────────────────────────

        private static CombatStepResult ResolveTutorialHit(CombatState state, OpeningId opening)
        {
            if (opening == OpeningId.Braccio)
                return RegisterCombatMistake(state);

            return new CombatStepResult(
                state.With(completed: true),
                new[]
                {
                    CombatData.TutorialSuccess[opening],
                    state.Alerted
                        ? "La creatura muore, ma l'urlo ha gia' attraversato il fumo."
                        : "La creatura muore prima di poter chiamare aiuto."
                },
                new CombatFlagPatch[]
                {
                    new CombatFlagPatch("orco_allarme", state.Alerted),
                    new CombatFlagPatch("colpo_tutorial", CombatData.OpeningName[opening])
                },
                CombatStatus.Completed,
                state.Alerted ? CombatOutcome.TutorialAlerted : CombatOutcome.TutorialClean);
        }

        private static CombatStepResult ResolveThreeEnemiesHit(CombatState state, OpeningId opening)
        {
            var remainingOpenings = state.RemainingOpenings
                .Where(o => o != opening)
                .ToList();

            if (remainingOpenings.Count == 0)
            {
                var resultFlag = GetThreeEnemyResultFlag(state.EncounterId);

                return new CombatStepResult(
                    state.With(remainingOpenings: remainingOpenings, completed: true),
                    new[]
                    {
                        CombatData.ThreeEnemySuccess[opening],
                        "L'ultimo nemico cade lontano dal tuo cammino. Il varco verso Errol resta aperto."
                    },
                    new CombatFlagPatch[]
                    {
                        new CombatFlagPatch(resultFlag.name, resultFlag.victory)
                    },
                    CombatStatus.Completed,
                    CombatOutcome.ThreeEnemiesVictory);
            }

            var nextState = state.With(remainingOpenings: remainingOpenings);

            return new CombatStepResult(
                nextState,
                new[] { CombatData.ThreeEnemySuccess[opening], FormatObserveText(nextState) },
                Array.Empty<CombatFlagPatch>(),
                CombatStatus.Ongoing);
        }

        private static OpeningId? FindOpening(CombatState state, string targetText)
        {
            if (targetText == null) return null;

            var normalizedTarget = NormalizeCombatText(targetText);

            foreach (var opening in state.RemainingOpenings)
            {
                foreach (var alias in CombatData.OpeningAliases[opening])
                {
                    var normalizedAlias = NormalizeCombatText(alias);
                    if (normalizedTarget == normalizedAlias
                        || normalizedTarget.StartsWith(normalizedAlias + " ")
                        || normalizedTarget.Contains(" " + normalizedAlias + " "))
                    {
                        return opening;
                    }
                }
            }

            return null;
        }

        private static (string name, string victory, string defeat) GetThreeEnemyResultFlag(CombatId encounterId)
        {
            if (encounterId == CombatId.TutorialOrcoSpada)
                throw new InvalidOperationException("Il tutorial non usa i flag dello scontro a tre nemici.");

            return CombatData.ThreeEnemyResultFlags[encounterId];
        }

        private static string FormatObserveText(CombatState state)
        {
            if (state.EncounterId == CombatId.TutorialOrcoSpada)
            {
                var alarm = state.Alerted
                    ? "Ha gia' urlato; ora devi chiudere lo scontro prima che i rinforzi arrivino."
                    : "La creatura e' stanca e non riesce a tenere compatta la guardia.";
                return $"{alarm} Aperture: {FormatOpenings(state.RemainingOpenings)}.";
            }

            return $"Tre nemici ti chiudono la strada. Aperture: {FormatOpenings(state.RemainingOpenings)}. Errori: {state.Errors}/2.";
        }

        private static string FormatOpenings(IEnumerable<OpeningId> openings)
        {
            return string.Join("; ", openings.Select(o =>
                $"{CombatData.OpeningName[o]} ({CombatData.OpeningClues[o]})"));
        }

        private static OpeningId? ParseOpeningName(string name)
        {
            foreach (var kv in CombatData.OpeningName)
            {
                if (kv.Value == name) return kv.Key;
            }
            return null;
        }

        internal static string NormalizeCombatText(string input)
        {
            if (input == null) return "";

            // 1. Decompose diacritics
            var decomposed = input.Normalize(NormalizationForm.FormD);

            // 2. Strip combining characters (diacritics)
            var sb = new StringBuilder();
            foreach (var c in decomposed)
            {
                if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                    sb.Append(c);
            }

            var result = sb.ToString();

            // 3. Replace curly quotes with space
            result = result.Replace('’', ' ').Replace('‘', ' ');

            // 4. Lowercase
            result = result.ToLowerInvariant();

            // 5. Replace non-letter/non-digit sequences with space
            result = NonLetterNumber.Replace(result, " ");

            // 6. Collapse spaces and trim
            result = MultiSpace.Replace(result, " ").Trim();

            return result;
        }
    }
}
