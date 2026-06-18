import { describe, expect, it } from "vitest";

import {
  attackCombat,
  getCombatView,
  parseCombatId,
  registerCombatMistake,
  startCombat,
  type CombatFlagPatch
} from "./combat";

function flagsToObject(flags: CombatFlagPatch[]): Record<string, unknown> {
  return Object.fromEntries(flags.map((flag) => [flag.name, flag.value]));
}

describe("combat tags", () => {
  it("recognizes blueprint combat identifiers", () => {
    expect(parseCombatId("TutorialOrcoSpada")).toBe("TutorialOrcoSpada");
    expect(parseCombatId("ScontroTreNemici.initial")).toBe("ScontroTreNemici.initial");
    expect(parseCombatId("ScontroTreNemici.rinforzi")).toBe("ScontroTreNemici.rinforzi");
  });
});

describe("TutorialOrcoSpada", () => {
  it("closes cleanly when the player hits a visible opening", () => {
    const state = startCombat("TutorialOrcoSpada");

    expect(getCombatView(state).choices).toEqual(["attacca ginocchia", "attacca fianco"]);

    const result = attackCombat(state, "ginocchia");

    expect(result.status).toBe("completed");
    expect(result.outcome).toBe("tutorial_clean");
    expect(flagsToObject(result.flags)).toEqual({
      orco_allarme: false,
      colpo_tutorial: "ginocchia"
    });
  });

  it("sets the alarm on a wrong first action, then records the final clean hit", () => {
    const state = startCombat("TutorialOrcoSpada");
    const alarm = attackCombat(state, "testa");

    expect(alarm.status).toBe("ongoing");
    expect(flagsToObject(alarm.flags)).toEqual({
      orco_allarme: true,
      colpo_tutorial: "maldestro_non_finale"
    });

    const finish = attackCombat(alarm.state, "fianco");

    expect(finish.status).toBe("completed");
    expect(finish.outcome).toBe("tutorial_alerted");
    expect(flagsToObject(finish.flags)).toEqual({
      orco_allarme: true,
      colpo_tutorial: "fianco"
    });
  });
});

describe("ScontroTreNemici", () => {
  it("removes one enemy per correct opening and marks victory", () => {
    const start = startCombat("ScontroTreNemici.initial");

    const first = attackCombat(start, "ginocchia primo nemico");
    expect(first.status).toBe("ongoing");
    expect(getCombatView(first.state).choices).toEqual(["attacca fianco", "attacca braccio"]);

    const second = attackCombat(first.state, "braccio");
    expect(second.status).toBe("ongoing");
    expect(getCombatView(second.state).choices).toEqual(["attacca fianco"]);

    const victory = attackCombat(second.state, "fianco");

    expect(victory.status).toBe("completed");
    expect(victory.outcome).toBe("three_enemies_victory");
    expect(flagsToObject(victory.flags)).toEqual({
      sogno_primo_scontro: "vinto"
    });
  });

  it("soft-defeats after two mistakes and sets rianimazione flags", () => {
    const start = startCombat("ScontroTreNemici.rinforzi");

    const firstError = attackCombat(start, "testa");
    expect(firstError.status).toBe("ongoing");
    expect(firstError.flags).toEqual([]);

    const defeat = registerCombatMistake(firstError.state);

    expect(defeat.status).toBe("completed");
    expect(defeat.outcome).toBe("soft_defeat");
    expect(flagsToObject(defeat.flags)).toEqual({
      sogno_rianimato: true,
      rinforzi_post_orco: "rianimato"
    });
  });
});
