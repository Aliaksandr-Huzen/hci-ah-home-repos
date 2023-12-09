#!/bin/bash

cd ./src/assets/visuals

# Create the folder to store Next Gen images
mkdir ./jp2
mkdir ./webp
mkdir ./placeholders

# Loop through all images in the Image directory
for file in *; do
  # This means, do not run this code on a directory, only on a file (-f)
  if [[ -f $file ]]; then

    fileName=$(echo $file | cut -d'.' -f 1) # something.jpg -> something

    echo $fileName

    # Create placeholder and move to Placeholder folder
    # These options are temporary and definitely have room for improvement
    if [[ $file == *.png ]]; then
      # -strip gets rid unnecessary metadata
      # -quality 1 - 100, specifies image quality
      # -resize creates thumbnail like images 4096@ = 64x64 16384@ 128x128
      convert $file -strip -quality 1 -colors 255 -resize 4096@ ./placeholders/$fileName.png
    else
      convert $file -strip -quality 20 -resize 16384@ ./placeholders/$fileName.jpg
    fi

    convert $file -quality 100  ./webp/$fileName.webp
    convert $file ./jp2/$fileName.jp2

  fi

done
