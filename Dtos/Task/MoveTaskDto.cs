using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Zenith.Dtos.Task
{
    public class MoveTaskDto
    {
        [Required(ErrorMessage = "Order is required")]
        public int Order { get; set; }
        public int? CategoryId { get; set; }
    }
}
