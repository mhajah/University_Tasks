var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/{param}", (string param) =>
{
    return $"Parametr: {param}";
});

app.MapGet("/{param:int}", (int param) =>
{
    return $"Parametr typu int: {param}";
});

app.MapGet("/{param:length(1,10)}", (string param) =>
{
    return $"Parametr z ograniczeniem d³ugoœci: {param}";
});

app.MapGet("/{param:required}", (string param) =>
{
    return $"Parametr wymagany: {param}";
});

app.MapGet("/{param:regex(^\\d{{4}}$)}", (string param) =>
{
    return $"Parametr spe³niaj¹cy wyra¿enie regularne: {param}";
});

app.Run();
