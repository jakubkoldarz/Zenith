using System.Text.Json.Serialization;

namespace Zenith.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProjectRole
    {
        Viewer = 0, // Can only view project
        Editor = 1, // Can view and edit project tasks and categories
        Owner = 2   // Can view, edit, delete and rename project
    }
}
