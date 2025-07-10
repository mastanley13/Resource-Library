# Employee Library Strategix – UI Polish & Feature Enhancement Plan

## 1. UI Polish
- **Improve Asset Card Visuals:**
  - Add hover effects and subtle shadows for better interactivity.
  - Use file type icons or thumbnails for common file types (image, PDF, doc, etc.).
  - Show file size and uploader info.
- **Consistent Spacing & Alignment:**
  - Ensure consistent padding/margins between elements.
  - Align filter bar, upload button, and asset grid for a clean look.
- **Dark/Light Mode Toggle:**
  - Add a toggle in the TopNav for dark/light mode support.
- **Loading & Empty States:**
  - Add skeleton loaders for asset cards.
  - Improve empty state messaging and visuals.
- **Responsive Design:**
  - Ensure all components look good on mobile/tablet.

## 2. Asset Organization Features
- **Folders & Categories:**
  - Allow users to create folders or categories to organize assets.
  - Add a sidebar or dropdown for folder/category navigation.
- **Tag Management:**
  - Allow users to add/remove tags from assets after upload.
  - Show a tag cloud or list for quick filtering.
- **Sorting Options:**
  - Enable sorting by name, date, type, or uploader.
- **Bulk Actions:**
  - Allow selecting multiple assets for bulk download, delete, or move.

## 3. Image/File Previews (Fix & Enhance)
- **Image Previews:**
  - Show image thumbnails in AssetCard and PreviewDrawer for image files (jpg, png, gif, etc.).
  - Use Supabase Storage signed URLs to display images securely.
- **File Previews:**
  - For PDFs: Show a preview icon and allow in-browser preview in PreviewDrawer.
  - For docs: Show file type icon and metadata.
  - For videos: Show a video player in PreviewDrawer if supported.
- **Fallbacks:**
  - Show a generic icon for unsupported file types.

## 4. User Experience Improvements
- **Notifications:**
  - Show toast notifications for upload success/failure, login, etc.
- **Better Auth Flows:**
  - Add a user profile dropdown in TopNav.
  - Show user avatar (from email or uploaded image).
- **Accessibility:**
  - Ensure all buttons and inputs are accessible via keyboard and screen readers.

## 5. Advanced Features (Optional)
- **Asset Versioning:**
  - Allow uploading new versions of an asset and viewing version history.
- **Comments/Notes:**
  - Allow users to add comments or notes to assets.
- **Audit Log:**
  - Track uploads, downloads, and changes for admin review.

---

## Implementation Steps
1. **Fix image/file previews in AssetCard and PreviewDrawer.**
2. Polish UI (spacing, loading states, dark/light mode, etc.).
3. Add asset organization features (folders, tags, sorting, bulk actions).
4. Enhance user experience (notifications, profile, accessibility).
5. Implement advanced features as needed.

---

*This plan can be tracked as issues or tasks in your project management tool for incremental delivery.* 