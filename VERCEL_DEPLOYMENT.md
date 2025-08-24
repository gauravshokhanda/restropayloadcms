# Vercel Deployment Guide - Image Visibility Fix

This guide explains how to resolve the common issue where images don't appear on Vercel deployments.

## Problem

When deploying to Vercel, images uploaded through the Payload CMS admin panel are not visible on the live site. This happens because:

1. Images are stored locally in `public/media/` directory
2. This directory is excluded from git (`.gitignore`)
3. Vercel doesn't have access to these files during deployment

## Solution

This project is now configured to automatically use **Vercel Blob Storage** for media files when deployed to Vercel, while falling back to local storage for development.

## Setup Instructions

### 1. Set up Vercel Blob Storage

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** tab
4. Click **Create Database** and select **Blob**
5. Create a new Blob store
6. Copy the `BLOB_READ_WRITE_TOKEN` from the connection details

### 2. Configure Environment Variables

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following variable:
   ```
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
   ```
3. Make sure to add it for all environments (Production, Preview, Development)

### 3. Deploy

Once the environment variable is set:

1. Push your code to your repository
2. Vercel will automatically redeploy
3. The system will now use Blob storage for all media uploads
4. Existing images will need to be re-uploaded through the admin panel

## How It Works

The configuration automatically detects when running on Vercel (`process.env.VERCEL`) and switches to Blob storage:

- **Development**: Uses local `public/media/` directory
- **Vercel Production**: Uses Vercel Blob Storage
- **Other deployments**: Uses local directory (you may need additional configuration)

## Important Notes

- **Existing images**: Images uploaded before this configuration won't automatically transfer. You'll need to re-upload them.
- **Cost**: Vercel Blob storage has usage-based pricing. Check Vercel's pricing page for details.
- **Performance**: Blob storage provides better performance and reliability than local file storage.

## Troubleshooting

### Images still not showing?

1. **Check environment variable**: Ensure `BLOB_READ_WRITE_TOKEN` is set correctly
2. **Redeploy**: Trigger a new deployment after setting the environment variable
3. **Re-upload**: Upload images again through the admin panel
4. **Check logs**: Look at Vercel function logs for any errors

### Local development issues?

- The system should automatically use local storage in development
- Make sure the `public/media/` directory exists locally
- Check that you're not setting `VERCEL=true` in your local environment

## Alternative Solutions

If you prefer not to use Vercel Blob storage, you can:

1. **Use other cloud storage**: Configure AWS S3, Cloudinary, or other storage providers
2. **Commit media files**: Remove `public/media/` from `.gitignore` (not recommended for large files)
3. **Use external CDN**: Store images externally and reference them by URL

For more information, see the [Payload CMS documentation](https://payloadcms.com/docs/upload/overview) on file uploads and storage adapters.