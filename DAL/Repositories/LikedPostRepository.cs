﻿using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class LikedPostRepository : GenericRepository<LikedPost>, ILikedPostRepository
    {
        public LikedPostRepository(PlatformContext platformContext) : base(platformContext) {}

        public async Task<LikedPost> GetByUserIdAndPostIdAsync(Guid userId, Guid postId)
        {
            return await _platformContext.Set<LikedPost>().FirstOrDefaultAsync(likedPost => likedPost.UserId == userId && likedPost.PostId == postId);
        }

        public async Task<IEnumerable<LikedPost>> GetAllForPostAsync(Guid postId)
        {
            return await FindAsync(likes => likes.PostId == postId);
        }

        public async Task<IEnumerable<LikedPost>> GetAllForUserAsync(Guid userId)
        {
            return await FindAsync(likes => likes.UserId == userId);
        }
    }
}
