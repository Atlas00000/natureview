#!/bin/bash

# Homepage Template Setup Script
# This script helps you set up the homepage template in a new project

echo "🏠 Homepage Template Setup"
echo "=========================="

# Check if target directory is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup.sh <target-project-path>"
    echo "Example: ./setup.sh ../my-new-project"
    exit 1
fi

TARGET_DIR="$1"

# Check if target directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Target directory does not exist: $TARGET_DIR"
    echo "Please create the directory first or provide a valid path."
    exit 1
fi

echo "📁 Copying template files to: $TARGET_DIR"

# Copy all template files
cp -r * "$TARGET_DIR/"

echo "✅ Template files copied successfully!"

echo ""
echo "🔧 Next steps:"
echo "1. Navigate to your project: cd $TARGET_DIR"
echo "2. Install dependencies: npm install"
echo "3. Update import paths in components"
echo "4. Customize data files (regions, wildlife, etc.)"
echo "5. Test the application: npm run dev"
echo ""
echo "📖 See README.md for detailed customization guide"
echo ""
echo "🎉 Setup complete! Happy coding!" 