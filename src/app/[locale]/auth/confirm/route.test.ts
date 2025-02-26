import { GET } from './route';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';

// Mock dependencies
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('Confirm Route', () => {
  let mockRequest: NextRequest;
  let mockSupabaseClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock Supabase client
    mockSupabaseClient = {
      auth: {
        verifyOtp: jest.fn().mockResolvedValue({ error: null }),
      },
    };
    (createClient as jest.Mock).mockResolvedValue(mockSupabaseClient);

    // Setup mock NextRequest
    const url = 'https://example.com/auth/confirm?token_hash=abc123&type=email';
    mockRequest = {
      url,
      nextUrl: new URL(url),
      cookies: { getAll: () => [] },
    } as unknown as NextRequest;
  });

  it('should redirect to the specified path when OTP verification is successful', async () => {
    // Test with default redirect path
    await GET(mockRequest);

    // Check that verifyOtp was called with correct parameters
    expect(mockSupabaseClient.auth.verifyOtp).toHaveBeenCalledWith({
      type: 'email',
      token_hash: 'abc123',
    });

    // Check that redirect was called with the default path
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('should redirect to the custom next path when provided and OTP verification is successful', async () => {
    // Setup mock request with custom next path
    const url = 'https://example.com/auth/confirm?token_hash=abc123&type=email&next=/dashboard';
    mockRequest = {
      url,
      nextUrl: new URL(url),
      cookies: { getAll: () => [] },
    } as unknown as NextRequest;

    await GET(mockRequest);

    // Check that redirect was called with the custom path
    expect(redirect).toHaveBeenCalledWith('/dashboard');
  });

  it('should redirect to error page when OTP verification fails', async () => {
    // Setup mock to return an error
    mockSupabaseClient.auth.verifyOtp.mockResolvedValue({
      error: { message: 'Invalid token' },
    });

    await GET(mockRequest);

    // Check that redirect was called with the error path
    expect(redirect).toHaveBeenCalledWith('/auth/error');
  });

  it('should redirect to error page when token_hash or type is missing', async () => {
    // Setup mock request with missing parameters
    const url = 'https://example.com/auth/confirm';
    mockRequest = {
      url,
      nextUrl: new URL(url),
      cookies: { getAll: () => [] },
    } as unknown as NextRequest;

    await GET(mockRequest);

    // Check that redirect was called with the error path
    expect(redirect).toHaveBeenCalledWith('/auth/error');
  });
});
