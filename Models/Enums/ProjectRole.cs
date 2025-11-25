using System.Text.Json.Serialization;

namespace Zenith.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProjectRole
    {
        Viewer, // Can only view project
        Editor, // Can view and edit project tasks and categories
        Owner   // Can view, edit, delete and rename project
    }
}
