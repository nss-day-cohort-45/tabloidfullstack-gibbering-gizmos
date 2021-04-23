using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserTypeRepository
    {
        void UpdateUserTypeById(int id, int userTypeId);
    }
}