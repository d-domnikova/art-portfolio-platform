using AutoMapper;
using BLL.DTO.User;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Isopoh.Cryptography.Argon2;
using System.Linq.Expressions;

namespace BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreateUser createUser)
        {
            var user = _mapper.Map<User>(createUser);
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.UserRepository.AddAsync(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdateUser updateUser)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id);
            if (user == null) return;

            _mapper.Map(updateUser, user);
            user.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.UserRepository.Update(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id);
            if (user == null) return;

            _unitOfWork.UserRepository.Remove(user);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<UserResponse>> GetAsync()
        {
            var users = await _unitOfWork.UserRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserResponse>>(users);
        }

        public async Task<UserResponse> GetByIdAsync(Guid id)
        {
            var user = await _unitOfWork.UserRepository.GetByIdAsync(id);
            return _mapper.Map<UserResponse>(user);
        }

        public async Task<IEnumerable<UserResponse>> FindByCredentialAsync(string attribute, string value)
        {
            var parameter = Expression.Parameter(typeof(User));
            var propertyExpression = Expression.Property(parameter, attribute);
            var valueExpression = Expression.Constant(value);
            var comparisonExpression = Expression.Equal(propertyExpression, valueExpression);
            var lambdaExpression = Expression.Lambda<Func<User, bool>>(comparisonExpression, parameter);

            var user = await _unitOfWork.UserRepository.FindAsync(lambdaExpression);
            var userResponse = _mapper.Map<IEnumerable<UserResponse>>(user);
            return userResponse;
        }
    }
}
