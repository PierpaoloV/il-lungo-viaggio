using System;
using System.Collections.Generic;
using IlLungoViaggio.Core;
using Xunit;

namespace IlLungoViaggio.Tests
{
    public class GameStateDefaultsTests
    {
        [Fact]
        public void Bool_flags_default_to_false()
        {
            GameState gs = new GameState();
            Assert.False(gs.LeggendaAscoltata);
            Assert.False(gs.BoscoTracceOsservate);
            Assert.False(gs.AcumeVivo);
            Assert.False(gs.PaninoDato);
            Assert.False(gs.VecchioAccompagnato);
            Assert.False(gs.RimorsoTornato);
            Assert.False(gs.DialogoErrolRicevuto);
            Assert.False(gs.VecchioHaNominatoSpada);
            Assert.False(gs.LesmidoomRivelato);
            Assert.False(gs.FaiBuonViaggioSentito);
            Assert.False(gs.OrcoAllarme);
            Assert.False(gs.SognoRianimato);
            Assert.False(gs.MedaglioneErrolPreso);
            Assert.False(gs.SpadaLungoViaggioRecuperata);
            Assert.False(gs.SpadaConsegnataErrol);
            Assert.False(gs.SegnoNotato);
            Assert.False(gs.PrologoCompletato);
        }

        [Fact]
        public void Int_flags_default_to_zero()
        {
            GameState gs = new GameState();
            Assert.Equal(0, gs.StatEmpatia);
            Assert.Equal(0, gs.StatCoraggio);
            Assert.Equal(0, gs.StatAcume);
        }

        [Fact]
        public void String_flags_match_ink_defaults()
        {
            GameState gs = new GameState();
            Assert.Equal("",                 gs.AiutoVecchio);
            Assert.Equal("bassa",            gs.SeedCuriositaVecchio);
            Assert.Equal("",                 gs.SeedMostroAffamato);
            Assert.Equal("nessuno",          gs.ColpoTutorial);
            Assert.Equal("saltato",          gs.SognoPrimoScontro);
            Assert.Equal("non_applicabile",  gs.RinforziPostOrco);
            Assert.Equal("",                 gs.SognoBivio);
            Assert.Equal("",                 gs.SognoPerdite);
            Assert.Equal("",                 gs.SeedCuriositaSegno);
        }

        [Fact]
        public void Extra_dict_starts_empty()
        {
            GameState gs = new GameState();
            Assert.Empty(gs.Extra);
        }
    }

    public class GameStateRoundTripTests
    {
        private static GameState MakeFullState()
        {
            return new GameState
            {
                LeggendaAscoltata           = true,
                BoscoTracceOsservate        = true,
                AcumeVivo                   = true,
                PaninoDato                  = true,
                VecchioAccompagnato         = true,
                RimorsoTornato              = true,
                DialogoErrolRicevuto        = true,
                VecchioHaNominatoSpada      = true,
                LesmidoomRivelato           = true,
                FaiBuonViaggioSentito       = true,
                OrcoAllarme                 = true,
                SognoRianimato              = true,
                MedaglioneErrolPreso        = true,
                SpadaLungoViaggioRecuperata = true,
                SpadaConsegnataErrol        = true,
                SegnoNotato                 = true,
                PrologoCompletato           = true,
                StatEmpatia                 = 3,
                StatCoraggio                = 7,
                StatAcume                   = 5,
                AiutoVecchio                = "A_panino_accompagna",
                SeedCuriositaVecchio        = "alta",
                SeedMostroAffamato          = "visto",
                ColpoTutorial               = "fianco",
                SognoPrimoScontro           = "vinto",
                RinforziPostOrco            = "arrivati",
                SognoBivio                  = "coordinato",
                SognoPerdite                = "basse",
                SeedCuriositaSegno          = "notato",
                Extra                       = new Dictionary<string, string>
                {
                    { "custom_key",   "custom_value" },
                    { "altro",        "valore" }
                }
            };
        }

        [Fact]
        public void RoundTrip_all_flags_preserved()
        {
            GameState original = MakeFullState();
            string json = original.ToJson();
            GameState restored = GameState.FromJson(json);

            // Bool
            Assert.True(restored.LeggendaAscoltata);
            Assert.True(restored.BoscoTracceOsservate);
            Assert.True(restored.AcumeVivo);
            Assert.True(restored.PaninoDato);
            Assert.True(restored.VecchioAccompagnato);
            Assert.True(restored.RimorsoTornato);
            Assert.True(restored.DialogoErrolRicevuto);
            Assert.True(restored.VecchioHaNominatoSpada);
            Assert.True(restored.LesmidoomRivelato);
            Assert.True(restored.FaiBuonViaggioSentito);
            Assert.True(restored.OrcoAllarme);
            Assert.True(restored.SognoRianimato);
            Assert.True(restored.MedaglioneErrolPreso);
            Assert.True(restored.SpadaLungoViaggioRecuperata);
            Assert.True(restored.SpadaConsegnataErrol);
            Assert.True(restored.SegnoNotato);
            Assert.True(restored.PrologoCompletato);

            // Int
            Assert.Equal(3, restored.StatEmpatia);
            Assert.Equal(7, restored.StatCoraggio);
            Assert.Equal(5, restored.StatAcume);

            // String
            Assert.Equal("A_panino_accompagna", restored.AiutoVecchio);
            Assert.Equal("alta",                restored.SeedCuriositaVecchio);
            Assert.Equal("visto",               restored.SeedMostroAffamato);
            Assert.Equal("fianco",              restored.ColpoTutorial);
            Assert.Equal("vinto",               restored.SognoPrimoScontro);
            Assert.Equal("arrivati",            restored.RinforziPostOrco);
            Assert.Equal("coordinato",          restored.SognoBivio);
            Assert.Equal("basse",               restored.SognoPerdite);
            Assert.Equal("notato",              restored.SeedCuriositaSegno);

            // Extra
            Assert.Equal("custom_value", restored.Extra["custom_key"]);
            Assert.Equal("valore",       restored.Extra["altro"]);
        }

        [Fact]
        public void RoundTrip_default_state_is_stable()
        {
            GameState gs = new GameState();
            string json = gs.ToJson();
            GameState restored = GameState.FromJson(json);

            Assert.False(restored.PrologoCompletato);
            Assert.False(restored.SegnoNotato);
            Assert.Equal(0,                restored.StatEmpatia);
            Assert.Equal("nessuno",        restored.ColpoTutorial);
            Assert.Equal("saltato",        restored.SognoPrimoScontro);
            Assert.Equal("non_applicabile",restored.RinforziPostOrco);
            Assert.Equal("bassa",          restored.SeedCuriositaVecchio);
            Assert.Empty(restored.Extra);
        }

        [Fact]
        public void RoundTrip_is_idempotent()
        {
            GameState original = MakeFullState();
            string json1 = original.ToJson();
            string json2 = GameState.FromJson(json1).ToJson();
            Assert.Equal(json1, json2);
        }

        [Fact]
        public void RoundTrip_strings_with_special_chars()
        {
            GameState gs = new GameState();
            gs.AiutoVecchio = "ha detto \"ciao\" e\nse n'e' andato";
            string json = gs.ToJson();
            GameState restored = GameState.FromJson(json);
            Assert.Equal(gs.AiutoVecchio, restored.AiutoVecchio);
        }

        [Fact]
        public void RoundTrip_extra_dict_with_special_chars()
        {
            GameState gs = new GameState();
            gs.Extra["k\"e\"y"] = "val\\ue\nwith\nnewlines";
            string json = gs.ToJson();
            GameState restored = GameState.FromJson(json);
            Assert.Equal("val\\ue\nwith\nnewlines", restored.Extra["k\"e\"y"]);
        }

        [Fact]
        public void RoundTrip_negative_int_flags()
        {
            GameState gs = new GameState();
            gs.StatEmpatia = -5;
            gs.StatCoraggio = -1;
            string json = gs.ToJson();
            GameState restored = GameState.FromJson(json);
            Assert.Equal(-5, restored.StatEmpatia);
            Assert.Equal(-1, restored.StatCoraggio);
        }
    }

    public class GameStateFromJsonRobustnessTests
    {
        [Fact]
        public void Returns_default_on_null_or_empty()
        {
            GameState gs1 = GameState.FromJson(null);
            GameState gs2 = GameState.FromJson("");
            GameState gs3 = GameState.FromJson("   ");

            Assert.NotNull(gs1);
            Assert.NotNull(gs2);
            Assert.NotNull(gs3);
            Assert.False(gs1.PrologoCompletato);
            Assert.False(gs2.PrologoCompletato);
            Assert.False(gs3.PrologoCompletato);
        }

        [Fact]
        public void Returns_default_on_corrupt_json()
        {
            GameState gs = GameState.FromJson("{ non json !!!!");
            Assert.NotNull(gs);
            Assert.False(gs.PrologoCompletato);
        }

        [Fact]
        public void Returns_default_on_unsupported_version()
        {
            string badVersion = "{\"version\":99,\"prologo_completato\":true}";
            GameState gs = GameState.FromJson(badVersion);
            Assert.NotNull(gs);
            // Should NOT load the flags from an unknown version
            Assert.False(gs.PrologoCompletato);
        }

        [Fact]
        public void Missing_key_falls_back_to_default()
        {
            // A minimal valid JSON with version=1 but no other keys
            string minimal = "{\"version\":1}";
            GameState gs = GameState.FromJson(minimal);
            Assert.NotNull(gs);
            Assert.False(gs.PrologoCompletato);
            Assert.Equal("nessuno",         gs.ColpoTutorial);
            Assert.Equal("saltato",         gs.SognoPrimoScontro);
            Assert.Equal("non_applicabile", gs.RinforziPostOrco);
            Assert.Equal("bassa",           gs.SeedCuriositaVecchio);
            Assert.Equal(0,                 gs.StatEmpatia);
            Assert.Empty(gs.Extra);
        }

        [Fact]
        public void Missing_extra_key_gives_empty_dict()
        {
            string json = "{\"version\":1,\"prologo_completato\":true}";
            GameState gs = GameState.FromJson(json);
            Assert.NotNull(gs);
            Assert.Empty(gs.Extra);
        }
    }

    public class GameStateJsonFormatTests
    {
        [Fact]
        public void ToJson_contains_version_1()
        {
            string json = new GameState().ToJson();
            Assert.Contains("\"version\":1", json);
        }

        [Fact]
        public void ToJson_is_nonempty_string()
        {
            string json = new GameState().ToJson();
            Assert.False(string.IsNullOrWhiteSpace(json));
        }

        [Fact]
        public void ToJson_starts_and_ends_with_braces()
        {
            string json = new GameState().ToJson();
            Assert.StartsWith("{", json);
            Assert.EndsWith("}", json);
        }

        [Fact]
        public void Bool_true_flag_renders_as_json_true()
        {
            GameState gs = new GameState { PrologoCompletato = true };
            string json = gs.ToJson();
            Assert.Contains("\"prologo_completato\":true", json);
        }

        [Fact]
        public void Bool_false_flag_renders_as_json_false()
        {
            GameState gs = new GameState { PrologoCompletato = false };
            string json = gs.ToJson();
            Assert.Contains("\"prologo_completato\":false", json);
        }
    }
}
