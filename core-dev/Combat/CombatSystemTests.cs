using System.Collections.Generic;
using System.Linq;
using IlLungoViaggio.Core;
using Xunit;

namespace IlLungoViaggio.Tests.Combat
{
    // Helper: replicates flagsToObject from combat.test.ts
    internal static class TestHelpers
    {
        public static Dictionary<string, object> FlagsToObject(IReadOnlyList<CombatFlagPatch> flags)
        {
            return flags.ToDictionary(f => f.Name, f => f.Value);
        }
    }

    // ──────────────────────────────────────────────────────────────
    // combat tags
    // ──────────────────────────────────────────────────────────────

    public class CombatTagsTests
    {
        [Fact]
        public void RecognizesBlueprintCombatIdentifiers()
        {
            Assert.Equal(CombatId.TutorialOrcoSpada,           CombatSystem.ParseCombatId("TutorialOrcoSpada"));
            Assert.Equal(CombatId.ScontroTreNemiciInitial,     CombatSystem.ParseCombatId("ScontroTreNemici.initial"));
            Assert.Equal(CombatId.ScontroTreNemiciRinforzi,    CombatSystem.ParseCombatId("ScontroTreNemici.rinforzi"));
        }
    }

    // ──────────────────────────────────────────────────────────────
    // TutorialOrcoSpada
    // ──────────────────────────────────────────────────────────────

    public class TutorialOrcoSpadaTests
    {
        [Fact]
        public void ClosesCleanlyWhenPlayerHitsVisibleOpening()
        {
            var state = CombatSystem.StartCombat(CombatId.TutorialOrcoSpada);

            // choices should be ["attacca ginocchia", "attacca fianco"]
            var choices = CombatSystem.GetCombatView(state).Choices;
            Assert.Equal(new[] { "attacca ginocchia", "attacca fianco" }, choices);

            var result = CombatSystem.AttackCombat(state, "ginocchia");

            Assert.Equal(CombatStatus.Completed, result.Status);
            Assert.Equal(CombatOutcome.TutorialClean, result.Outcome);

            var flags = TestHelpers.FlagsToObject(result.Flags);
            Assert.Equal(false,        flags["orco_allarme"]);
            Assert.Equal("ginocchia",  flags["colpo_tutorial"]);
        }

        [Fact]
        public void SetsAlarmOnWrongFirstAction_ThenRecordsFinalCleanHit()
        {
            var state = CombatSystem.StartCombat(CombatId.TutorialOrcoSpada);

            var alarm = CombatSystem.AttackCombat(state, "testa");

            Assert.Equal(CombatStatus.Ongoing, alarm.Status);

            var alarmFlags = TestHelpers.FlagsToObject(alarm.Flags);
            Assert.Equal(true,                     alarmFlags["orco_allarme"]);
            Assert.Equal("maldestro_non_finale",   alarmFlags["colpo_tutorial"]);

            var finish = CombatSystem.AttackCombat(alarm.State, "fianco");

            Assert.Equal(CombatStatus.Completed,        finish.Status);
            Assert.Equal(CombatOutcome.TutorialAlerted, finish.Outcome);

            var finishFlags = TestHelpers.FlagsToObject(finish.Flags);
            Assert.Equal(true,      finishFlags["orco_allarme"]);
            Assert.Equal("fianco",  finishFlags["colpo_tutorial"]);
        }
    }

    // ──────────────────────────────────────────────────────────────
    // ScontroTreNemici
    // ──────────────────────────────────────────────────────────────

    public class ScontroTreNemiciTests
    {
        [Fact]
        public void RemovesOneEnemyPerCorrectOpeningAndMarksVictory()
        {
            var start = CombatSystem.StartCombat(CombatId.ScontroTreNemiciInitial);

            // "ginocchia primo nemico" — alias 'ginocchia' is a prefix of the target text
            var first = CombatSystem.AttackCombat(start, "ginocchia primo nemico");
            Assert.Equal(CombatStatus.Ongoing, first.Status);
            Assert.Equal(
                new[] { "attacca fianco", "attacca braccio" },
                CombatSystem.GetCombatView(first.State).Choices);

            var second = CombatSystem.AttackCombat(first.State, "braccio");
            Assert.Equal(CombatStatus.Ongoing, second.Status);
            Assert.Equal(
                new[] { "attacca fianco" },
                CombatSystem.GetCombatView(second.State).Choices);

            var victory = CombatSystem.AttackCombat(second.State, "fianco");

            Assert.Equal(CombatStatus.Completed,             victory.Status);
            Assert.Equal(CombatOutcome.ThreeEnemiesVictory,  victory.Outcome);

            var flags = TestHelpers.FlagsToObject(victory.Flags);
            Assert.Equal("vinto", flags["sogno_primo_scontro"]);
        }

        [Fact]
        public void SoftDefeatsAfterTwoMistakesAndSetsRianimazioneFlags()
        {
            var start = CombatSystem.StartCombat(CombatId.ScontroTreNemiciRinforzi);

            var firstError = CombatSystem.AttackCombat(start, "testa");
            Assert.Equal(CombatStatus.Ongoing, firstError.Status);
            Assert.Empty(firstError.Flags);

            var defeat = CombatSystem.RegisterCombatMistake(firstError.State);

            Assert.Equal(CombatStatus.Completed,      defeat.Status);
            Assert.Equal(CombatOutcome.SoftDefeat,    defeat.Outcome);

            var flags = TestHelpers.FlagsToObject(defeat.Flags);
            Assert.Equal(true,         flags["sogno_rianimato"]);
            Assert.Equal("rianimato",  flags["rinforzi_post_orco"]);
        }
    }
}
