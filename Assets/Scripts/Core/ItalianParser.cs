using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace IlLungoViaggio.Core
{
    public enum CanonicalVerb
    {
        Esamina,
        Guarda,
        Vai,
        Segui,
        Prendi,
        Parla,
        Dai,
        Usa,
        Accompagna,
        Indica,
        Dormi,
        Attacca,
        Fuggi,
        Inventario,
        Aspetta,
        Aiuto
    }

    public class ParserObject
    {
        public string Id { get; set; }
        public string Label { get; set; }
        public List<string> Aliases { get; set; }

        public ParserObject(string id, string label, List<string> aliases)
        {
            Id = id;
            Label = label;
            Aliases = aliases;
        }
    }

    public class ParserContext
    {
        public List<ParserObject> Objects { get; set; }

        public ParserContext(List<ParserObject> objects)
        {
            Objects = objects;
        }
    }

    public class ParsedCommand
    {
        public CanonicalVerb Verb { get; set; }
        public string TargetId { get; set; }
        public string SecondaryTargetId { get; set; }
        public string TargetText { get; set; }
        public string SecondaryTargetText { get; set; }
    }

    public enum ParserResultStatus
    {
        Command,
        Ambiguity,
        Unknown
    }

    public class ParserResult
    {
        public ParserResultStatus Status { get; set; }
        public ParsedCommand Command { get; set; }
        public string Message { get; set; }
        public CanonicalVerb? AmbiguityVerb { get; set; }
        public List<ParserObject> Matches { get; set; }
    }

    public static class ItalianParser
    {
        private const string UnknownMessage = "Non capisco. Prova aiuto per vedere cosa puoi fare.";

        private static readonly HashSet<string> FillerWords = new HashSet<string>(StringComparer.Ordinal)
        {
            "il", "lo", "la", "l", "i", "gli", "le",
            "un", "uno", "una",
            "del", "dello", "della", "dei", "degli", "delle",
            "al", "allo", "alla", "ai", "agli", "alle",
            "a", "ad",
            "da", "dal", "dallo", "dalla", "dai", "dagli", "dalle",
            "di",
            "nel", "nello", "nella", "nei", "negli", "nelle",
            "per", "verso"
        };

        private static readonly Dictionary<string, CanonicalVerb> Verbs = new Dictionary<string, CanonicalVerb>(StringComparer.Ordinal)
        {
            { "esamina",    CanonicalVerb.Esamina },
            { "esamino",    CanonicalVerb.Esamina },
            { "esaminare",  CanonicalVerb.Esamina },
            { "ispeziona",  CanonicalVerb.Esamina },
            { "ispeziono",  CanonicalVerb.Esamina },
            { "ispezionare",CanonicalVerb.Esamina },
            { "guarda",     CanonicalVerb.Guarda },
            { "guardo",     CanonicalVerb.Guarda },
            { "guardare",   CanonicalVerb.Guarda },
            { "guardati",   CanonicalVerb.Guarda },
            { "osserva",    CanonicalVerb.Guarda },
            { "osservo",    CanonicalVerb.Guarda },
            { "osservare",  CanonicalVerb.Guarda },
            { "vai",        CanonicalVerb.Vai },
            { "vado",       CanonicalVerb.Vai },
            { "andare",     CanonicalVerb.Vai },
            { "cammina",    CanonicalVerb.Vai },
            { "cammino",    CanonicalVerb.Vai },
            { "camminare",  CanonicalVerb.Vai },
            { "raggiungi",  CanonicalVerb.Vai },
            { "raggiungo",  CanonicalVerb.Vai },
            { "raggiungere",CanonicalVerb.Vai },
            { "entra",      CanonicalVerb.Vai },
            { "entro",      CanonicalVerb.Vai },
            { "entrare",    CanonicalVerb.Vai },
            { "segui",      CanonicalVerb.Segui },
            { "seguo",      CanonicalVerb.Segui },
            { "seguire",    CanonicalVerb.Segui },
            { "insegui",    CanonicalVerb.Segui },
            { "inseguo",    CanonicalVerb.Segui },
            { "inseguire",  CanonicalVerb.Segui },
            { "prendi",     CanonicalVerb.Prendi },
            { "prendo",     CanonicalVerb.Prendi },
            { "prendere",   CanonicalVerb.Prendi },
            { "raccogli",   CanonicalVerb.Prendi },
            { "raccolgo",   CanonicalVerb.Prendi },
            { "raccogliere",CanonicalVerb.Prendi },
            { "afferra",    CanonicalVerb.Prendi },
            { "afferro",    CanonicalVerb.Prendi },
            { "afferrare",  CanonicalVerb.Prendi },
            { "parla",      CanonicalVerb.Parla },
            { "parlo",      CanonicalVerb.Parla },
            { "parlare",    CanonicalVerb.Parla },
            { "chiedi",     CanonicalVerb.Parla },
            { "chiedo",     CanonicalVerb.Parla },
            { "chiedere",   CanonicalVerb.Parla },
            { "chiama",     CanonicalVerb.Parla },
            { "chiamo",     CanonicalVerb.Parla },
            { "chiamare",   CanonicalVerb.Parla },
            { "di",         CanonicalVerb.Parla },
            { "dico",       CanonicalVerb.Parla },
            { "dire",       CanonicalVerb.Parla },
            { "dai",        CanonicalVerb.Dai },
            { "do",         CanonicalVerb.Dai },
            { "dare",       CanonicalVerb.Dai },
            { "offri",      CanonicalVerb.Dai },
            { "offro",      CanonicalVerb.Dai },
            { "offrire",    CanonicalVerb.Dai },
            { "porgi",      CanonicalVerb.Dai },
            { "porgo",      CanonicalVerb.Dai },
            { "porgere",    CanonicalVerb.Dai },
            { "regala",     CanonicalVerb.Dai },
            { "regalo",     CanonicalVerb.Dai },
            { "regalare",   CanonicalVerb.Dai },
            { "usa",        CanonicalVerb.Usa },
            { "uso",        CanonicalVerb.Usa },
            { "usare",      CanonicalVerb.Usa },
            { "adopera",    CanonicalVerb.Usa },
            { "adopero",    CanonicalVerb.Usa },
            { "adoperare",  CanonicalVerb.Usa },
            { "mangia",     CanonicalVerb.Usa },
            { "mangio",     CanonicalVerb.Usa },
            { "mangiare",   CanonicalVerb.Usa },
            { "accompagna", CanonicalVerb.Accompagna },
            { "accompagno", CanonicalVerb.Accompagna },
            { "accompagnare",CanonicalVerb.Accompagna },
            { "indica",     CanonicalVerb.Indica },
            { "indico",     CanonicalVerb.Indica },
            { "indicare",   CanonicalVerb.Indica },
            { "mostra",     CanonicalVerb.Indica },
            { "mostro",     CanonicalVerb.Indica },
            { "mostrare",   CanonicalVerb.Indica },
            { "attacca",    CanonicalVerb.Attacca },
            { "attacco",    CanonicalVerb.Attacca },
            { "attaccare",  CanonicalVerb.Attacca },
            { "colpisci",   CanonicalVerb.Attacca },
            { "colpisco",   CanonicalVerb.Attacca },
            { "colpire",    CanonicalVerb.Attacca },
            { "ferisci",    CanonicalVerb.Attacca },
            { "ferisco",    CanonicalVerb.Attacca },
            { "ferire",     CanonicalVerb.Attacca },
            { "fuggi",      CanonicalVerb.Fuggi },
            { "fuggo",      CanonicalVerb.Fuggi },
            { "fuggire",    CanonicalVerb.Fuggi },
            { "scappa",     CanonicalVerb.Fuggi },
            { "scappo",     CanonicalVerb.Fuggi },
            { "scappare",   CanonicalVerb.Fuggi },
            { "inventario", CanonicalVerb.Inventario },
            { "inv",        CanonicalVerb.Inventario },
            { "zaino",      CanonicalVerb.Inventario },
            { "oggetti",    CanonicalVerb.Inventario },
            { "dormi",      CanonicalVerb.Dormi },
            { "dormo",      CanonicalVerb.Dormi },
            { "dormire",    CanonicalVerb.Dormi },
            { "riposa",     CanonicalVerb.Dormi },
            { "riposo",     CanonicalVerb.Dormi },
            { "riposare",   CanonicalVerb.Dormi },
            { "aspetta",    CanonicalVerb.Aspetta },
            { "attendi",    CanonicalVerb.Aspetta },
            { "attendo",    CanonicalVerb.Aspetta },
            { "attendere",  CanonicalVerb.Aspetta },
            { "esita",      CanonicalVerb.Aspetta },
            { "esito",      CanonicalVerb.Aspetta },
            { "esitare",    CanonicalVerb.Aspetta },
            { "aiuto",      CanonicalVerb.Aiuto },
            { "comandi",    CanonicalVerb.Aiuto },
            { "azioni",     CanonicalVerb.Aiuto }
        };

        public static ParserResult ParseItalianCommand(string input, ParserContext context)
        {
            var tokens = Tokenize(input);

            if (tokens.Count == 0)
                return MakeCommand(new ParsedCommand { Verb = CanonicalVerb.Aspetta });

            if (tokens[0] == "?")
                return MakeCommand(new ParsedCommand { Verb = CanonicalVerb.Aiuto });

            var verbToken = tokens[0];
            if (!Verbs.TryGetValue(verbToken, out CanonicalVerb parsedVerb))
                return MakeUnknown();

            var rest = tokens.Skip(1).ToList();

            switch (parsedVerb)
            {
                case CanonicalVerb.Inventario:
                case CanonicalVerb.Fuggi:
                case CanonicalVerb.Dormi:
                case CanonicalVerb.Aspetta:
                case CanonicalVerb.Aiuto:
                    return MakeCommand(new ParsedCommand { Verb = parsedVerb });

                case CanonicalVerb.Guarda:
                {
                    var targetWords = DropFillers(rest);
                    if (targetWords.Count == 0 || IsLookAroundTarget(targetWords))
                        return MakeCommand(new ParsedCommand { Verb = CanonicalVerb.Guarda });
                    return ResolveObjectCommand(CanonicalVerb.Esamina, targetWords, context);
                }

                case CanonicalVerb.Vai:
                    return MakeCommand(new ParsedCommand
                    {
                        Verb = CanonicalVerb.Vai,
                        TargetText = TargetText(DropFillers(rest))
                    });

                case CanonicalVerb.Parla:
                {
                    var targetWords = DropFillers(rest);
                    if (targetWords.Count == 0)
                        return new ParserResult { Status = ParserResultStatus.Unknown, Message = MissingTargetMessage(CanonicalVerb.Parla) };

                    var resolution = ResolveObject(targetWords, context);
                    if (resolution.Status == ObjectResolutionStatus.Match)
                        return MakeCommand(new ParsedCommand
                        {
                            Verb = CanonicalVerb.Parla,
                            TargetId = resolution.Object.Id,
                            TargetText = TargetText(resolution.TargetWords)
                        });
                    if (resolution.Status == ObjectResolutionStatus.Ambiguous)
                        return new ParserResult
                        {
                            Status = ParserResultStatus.Ambiguity,
                            AmbiguityVerb = CanonicalVerb.Parla,
                            Matches = resolution.Matches,
                            Message = "Quale? " + FormatOptions(resolution.Matches) + "."
                        };
                    return MakeCommand(new ParsedCommand { Verb = CanonicalVerb.Parla, TargetText = TargetText(targetWords) });
                }

                case CanonicalVerb.Attacca:
                {
                    var targetWords = DropFillers(rest);
                    if (targetWords.Count == 0)
                        return new ParserResult { Status = ParserResultStatus.Unknown, Message = MissingTargetMessage(CanonicalVerb.Attacca) };
                    return MakeCommand(new ParsedCommand { Verb = CanonicalVerb.Attacca, TargetText = TargetText(targetWords) });
                }

                case CanonicalVerb.Usa:
                {
                    int splitIndex = rest.IndexOf("con");
                    var firstTarget = splitIndex >= 0 ? rest.Take(splitIndex).ToList() : rest;
                    var secondTarget = splitIndex >= 0 ? rest.Skip(splitIndex + 1).ToList() : new List<string>();
                    var primaryWords = DropFillers(firstTarget);
                    var primary = ResolveObject(primaryWords, context);

                    if (primary.Status != ObjectResolutionStatus.Match)
                        return ObjectResolutionToResult(CanonicalVerb.Usa, primary);

                    if (secondTarget.Count == 0)
                        return MakeCommand(new ParsedCommand
                        {
                            Verb = CanonicalVerb.Usa,
                            TargetId = primary.Object.Id,
                            TargetText = TargetText(primaryWords)
                        });

                    var secondaryWords = DropFillers(secondTarget);
                    var secondary = ResolveObject(secondaryWords, context);

                    if (secondary.Status != ObjectResolutionStatus.Match)
                        return ObjectResolutionToResult(CanonicalVerb.Usa, secondary);

                    return MakeCommand(new ParsedCommand
                    {
                        Verb = CanonicalVerb.Usa,
                        TargetId = primary.Object.Id,
                        SecondaryTargetId = secondary.Object.Id,
                        TargetText = TargetText(primaryWords),
                        SecondaryTargetText = TargetText(secondaryWords)
                    });
                }

                default:
                    return ResolveObjectCommand(parsedVerb, DropFillers(rest), context);
            }
        }

        public static string NormalizeItalianText(string input)
        {
            // Decompose accented chars, strip combining marks
            var decomposed = input.Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder(decomposed.Length);
            foreach (char c in decomposed)
            {
                var cat = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c);
                if (cat != System.Globalization.UnicodeCategory.NonSpacingMark)
                    sb.Append(c);
            }
            var noAccents = sb.ToString();

            // Replace curly apostrophes with space (matches TS: .replace(/['']/g, " "))
            noAccents = noAccents.Replace('‘', ' ').Replace('’', ' ').Replace('\'', ' ');

            // Lowercase
            var lower = noAccents.ToLowerInvariant();

            // Replace non-letter/non-digit sequences with space
            lower = Regex.Replace(lower, @"[^\p{L}\p{N}]+", " ");

            // Collapse whitespace and trim
            lower = Regex.Replace(lower, @"\s+", " ").Trim();

            return lower;
        }

        // ── private helpers ──────────────────────────────────────────────────────

        private static List<string> Tokenize(string input)
        {
            if (input.Trim() == "?")
                return new List<string> { "?" };

            var normalized = NormalizeItalianText(input);
            if (normalized.Length == 0)
                return new List<string>();
            return normalized.Split(' ').ToList();
        }

        private static List<string> DropFillers(List<string> words)
        {
            return words.Where(w => !FillerWords.Contains(w)).ToList();
        }

        private static string TargetText(List<string> words)
        {
            return string.Join(" ", words).Trim();
        }

        private static bool IsLookAroundTarget(List<string> words)
        {
            var t = TargetText(words);
            return t == "intorno" || t == "attorno";
        }

        private static string FormatOptions(List<ParserObject> objects)
        {
            return string.Join(" o ", objects.Select(o => o.Label));
        }

        private static string MissingTargetMessage(CanonicalVerb verb)
        {
            switch (verb)
            {
                case CanonicalVerb.Esamina:    return "Che cosa vuoi esaminare?";
                case CanonicalVerb.Prendi:     return "Che cosa vuoi prendere?";
                case CanonicalVerb.Parla:      return "Con chi vuoi parlare?";
                case CanonicalVerb.Dai:        return "Che cosa vuoi dare?";
                case CanonicalVerb.Usa:        return "Che cosa vuoi usare?";
                case CanonicalVerb.Attacca:    return "Dove vuoi colpire?";
                case CanonicalVerb.Segui:      return "Chi vuoi seguire?";
                case CanonicalVerb.Accompagna: return "Chi vuoi accompagnare?";
                case CanonicalVerb.Indica:     return "Che cosa vuoi indicare?";
                default:                       return UnknownMessage;
            }
        }

        private static ParserResult MakeCommand(ParsedCommand cmd)
        {
            return new ParserResult { Status = ParserResultStatus.Command, Command = cmd };
        }

        private static ParserResult MakeUnknown()
        {
            return new ParserResult { Status = ParserResultStatus.Unknown, Message = UnknownMessage };
        }

        private static ParserResult ResolveObjectCommand(CanonicalVerb verb, List<string> targetWords, ParserContext context)
        {
            return ObjectResolutionToResult(verb, ResolveObject(targetWords, context));
        }

        private static ParserResult ObjectResolutionToResult(CanonicalVerb verb, ObjectResolution resolution)
        {
            switch (resolution.Status)
            {
                case ObjectResolutionStatus.Missing:
                    return new ParserResult { Status = ParserResultStatus.Unknown, Message = MissingTargetMessage(verb) };
                case ObjectResolutionStatus.Ambiguous:
                    return new ParserResult
                    {
                        Status = ParserResultStatus.Ambiguity,
                        AmbiguityVerb = verb,
                        Matches = resolution.Matches,
                        Message = "Quale? " + FormatOptions(resolution.Matches) + "."
                    };
                case ObjectResolutionStatus.Unknown:
                    return MakeUnknown();
                default: // Match
                    return MakeCommand(new ParsedCommand
                    {
                        Verb = verb,
                        TargetId = resolution.Object.Id,
                        TargetText = TargetText(resolution.TargetWords)
                    });
            }
        }

        private static ObjectResolution ResolveObject(List<string> targetWords, ParserContext context)
        {
            if (targetWords.Count == 0)
                return new ObjectResolution { Status = ObjectResolutionStatus.Missing };

            var target = TargetText(targetWords);
            var matches = context.Objects.Where(obj =>
                obj.Aliases.Any(alias =>
                {
                    var normalizedAlias = TargetText(DropFillers(Tokenize(alias)));
                    return normalizedAlias == target || normalizedAlias.StartsWith(target + " ");
                })
            ).ToList();

            if (matches.Count == 0)
                return new ObjectResolution { Status = ObjectResolutionStatus.Unknown };
            if (matches.Count > 1)
                return new ObjectResolution { Status = ObjectResolutionStatus.Ambiguous, Matches = matches };

            return new ObjectResolution { Status = ObjectResolutionStatus.Match, Object = matches[0], TargetWords = targetWords };
        }

        private enum ObjectResolutionStatus { Match, Ambiguous, Missing, Unknown }

        private class ObjectResolution
        {
            public ObjectResolutionStatus Status { get; set; }
            public ParserObject Object { get; set; }
            public List<string> TargetWords { get; set; }
            public List<ParserObject> Matches { get; set; }
        }
    }
}
