﻿using BLL.DTO.User;

namespace BLL.DTO.Auth
{
    public class AuthResponse
    {
        public string Token { get; set; }
        public UserResponse User { get; set; }
    }
}
