using System.Collections.Generic;
using IlLungoViaggio.Core;
using Xunit;

public class ItalianParserTests
{
    // ── shared context ────────────────────────────────────────────────────────
    private static readonly ParserContext Ctx = new ParserContext(new List<ParserObject>
    {
        new ParserObject("spada_legno",  "la spada di legno",        new List<string> { "spada", "spada di legno" }),
        new ParserObject("mezzo_panino", "il mezzo panino",           new List<string> { "panino", "mezzo panino" }),
        new ParserObject("mirea",        "Mirea",                     new List<string> { "mirea" })
    });

    // ── normalisation ─────────────────────────────────────────────────────────
    [Fact]
    public void Normalizes_case_accents_and_punctuation()
    {
        Assert.Equal("di alla mirea", ItalianParser.NormalizeItalianText("DÌ, alla MIREA!"));
    }

    // ── no-object / intransitive verbs ────────────────────────────────────────
    [Theory]
    [InlineData("",         CanonicalVerb.Aspetta,    null, null, null, null)]
    [InlineData("aspetta",  CanonicalVerb.Aspetta,    null, null, null, null)]
    [InlineData("attendi",  CanonicalVerb.Aspetta,    null, null, null, null)]
    [InlineData("esita",    CanonicalVerb.Aspetta,    null, null, null, null)]
    [InlineData("?",        CanonicalVerb.Aiuto,      null, null, null, null)]
    [InlineData("AIUTO?",   CanonicalVerb.Aiuto,      null, null, null, null)]
    [InlineData("comandi",  CanonicalVerb.Aiuto,      null, null, null, null)]
    [InlineData("inv",      CanonicalVerb.Inventario, null, null, null, null)]
    [InlineData("fuggi",    CanonicalVerb.Fuggi,      null, null, null, null)]
    [InlineData("scappa",   CanonicalVerb.Fuggi,      null, null, null, null)]
    [InlineData("guarda intorno", CanonicalVerb.Guarda, null, null, null, null)]
    public void Parses_intransitive_commands(
        string input, CanonicalVerb verb,
        string targetId, string secondaryTargetId, string targetText, string secondaryTargetText)
    {
        var result = ItalianParser.ParseItalianCommand(input, Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(verb, result.Command.Verb);
        Assert.Equal(targetId,          result.Command.TargetId);
        Assert.Equal(secondaryTargetId, result.Command.SecondaryTargetId);
        Assert.Equal(targetText,        result.Command.TargetText);
        Assert.Equal(secondaryTargetText, result.Command.SecondaryTargetText);
    }

    // ── vai ───────────────────────────────────────────────────────────────────
    [Fact]
    public void Parses_vai_north()
    {
        var result = ItalianParser.ParseItalianCommand("cammina a nord", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Vai, result.Command.Verb);
        Assert.Equal("nord", result.Command.TargetText);
    }

    [Fact]
    public void Parses_raggiungi_dropping_article()
    {
        var result = ItalianParser.ParseItalianCommand("raggiungi la citta", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Vai, result.Command.Verb);
        Assert.Equal("citta", result.Command.TargetText);
    }

    // ── guarda → esamina ──────────────────────────────────────────────────────
    [Fact]
    public void Guarda_object_redirects_to_esamina()
    {
        var result = ItalianParser.ParseItalianCommand("guarda la spada", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Esamina, result.Command.Verb);
        Assert.Equal("spada_legno", result.Command.TargetId);
        Assert.Equal("spada", result.Command.TargetText);
    }

    [Fact]
    public void Osserva_al_panino_resolves_to_esamina()
    {
        var result = ItalianParser.ParseItalianCommand("osserva al panino", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Esamina, result.Command.Verb);
        Assert.Equal("mezzo_panino", result.Command.TargetId);
        Assert.Equal("panino", result.Command.TargetText);
    }

    // ── prendi ────────────────────────────────────────────────────────────────
    [Fact]
    public void Prendi_la_spada()
    {
        var result = ItalianParser.ParseItalianCommand("prendo la spada", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Prendi, result.Command.Verb);
        Assert.Equal("spada_legno", result.Command.TargetId);
        Assert.Equal("spada", result.Command.TargetText);
    }

    [Fact]
    public void Raccogli_il_panino()
    {
        var result = ItalianParser.ParseItalianCommand("raccogli il panino", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Prendi, result.Command.Verb);
        Assert.Equal("mezzo_panino", result.Command.TargetId);
        Assert.Equal("panino", result.Command.TargetText);
    }

    // ── parla ─────────────────────────────────────────────────────────────────
    [Fact]
    public void Di_a_Mirea_resolves_person()
    {
        // "di' a Mirea" — apostrophe normalised to space → tokens: ["di", "mirea"]
        var result = ItalianParser.ParseItalianCommand("di’ a Mirea", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Parla, result.Command.Verb);
        Assert.Equal("mirea", result.Command.TargetId);
        Assert.Equal("mirea", result.Command.TargetText);
    }

    // ── dai ───────────────────────────────────────────────────────────────────
    [Fact]
    public void Offri_il_panino()
    {
        var result = ItalianParser.ParseItalianCommand("offri il panino", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Dai, result.Command.Verb);
        Assert.Equal("mezzo_panino", result.Command.TargetId);
        Assert.Equal("panino", result.Command.TargetText);
    }

    // ── usa con ───────────────────────────────────────────────────────────────
    [Fact]
    public void Usa_spada_con_panino()
    {
        var result = ItalianParser.ParseItalianCommand("usa la spada con il panino", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Usa, result.Command.Verb);
        Assert.Equal("spada_legno",  result.Command.TargetId);
        Assert.Equal("mezzo_panino", result.Command.SecondaryTargetId);
        Assert.Equal("spada",  result.Command.TargetText);
        Assert.Equal("panino", result.Command.SecondaryTargetText);
    }

    // ── attacca ───────────────────────────────────────────────────────────────
    [Fact]
    public void Attacca_free_text_target()
    {
        var result = ItalianParser.ParseItalianCommand("attacca ginocchia", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Attacca, result.Command.Verb);
        Assert.Equal("ginocchia", result.Command.TargetText);
    }

    [Fact]
    public void Colpisci_dropping_article()
    {
        var result = ItalianParser.ParseItalianCommand("colpisci il fianco", Ctx);
        Assert.Equal(ParserResultStatus.Command, result.Status);
        Assert.Equal(CanonicalVerb.Attacca, result.Command.Verb);
        Assert.Equal("fianco", result.Command.TargetText);
    }

    // ── ambiguity ─────────────────────────────────────────────────────────────
    [Fact]
    public void Asks_for_disambiguation_when_multiple_objects_match()
    {
        var ambCtx = new ParserContext(new List<ParserObject>
        {
            new ParserObject("spada_legno",        "la spada di legno",          new List<string> { "spada" }),
            new ParserObject("spada_lungo_viaggio", "la Spada del Lungo Viaggio", new List<string> { "spada" })
        });

        var result = ItalianParser.ParseItalianCommand("esamina la spada", ambCtx);
        Assert.Equal(ParserResultStatus.Ambiguity, result.Status);
        Assert.Equal("Quale? la spada di legno o la Spada del Lungo Viaggio.", result.Message);
    }

    // ── unknown ───────────────────────────────────────────────────────────────
    [Fact]
    public void Unknown_verb_returns_unknown()
    {
        var result = ItalianParser.ParseItalianCommand("balla forte", Ctx);
        Assert.Equal(ParserResultStatus.Unknown, result.Status);
        Assert.Equal("Non capisco. Prova aiuto per vedere cosa puoi fare.", result.Message);
    }

    [Fact]
    public void Known_verb_but_missing_object_returns_unknown()
    {
        var result = ItalianParser.ParseItalianCommand("esamina luna", Ctx);
        Assert.Equal(ParserResultStatus.Unknown, result.Status);
        Assert.Equal("Non capisco. Prova aiuto per vedere cosa puoi fare.", result.Message);
    }

    [Fact]
    public void Attacca_without_target_returns_specific_message()
    {
        var result = ItalianParser.ParseItalianCommand("attacca", Ctx);
        Assert.Equal(ParserResultStatus.Unknown, result.Status);
        Assert.Equal("Dove vuoi colpire?", result.Message);
    }
}
