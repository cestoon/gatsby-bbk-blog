const fs = require('fs');
const path = require('path');
const os = require('os');

// 目录生成脚本
const generateTOC = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const basePath = path.dirname(filePath);

    const moveAndUpdateImagePaths = (content, basePath) => {
      const imagePattern1 = /<img src="\/Users\/bin\/Library\/Application Support\/typora-user-images\/(image-\S+?\..+?)" alt="\S+?" style=".+?" ?\/>/g;
      const imagePattern2 = /!\[(image-\S+?)\]\(\/Users\/bin\/Library\/Application Support\/typora-user-images\/(image-\S+?\..+?)\)/g;
      let updatedContent = content;
      let match;
    
      while ((match = imagePattern1.exec(content)) !== null) {
        const oldImagePath = path.join(os.homedir(), 'Library', 'Application Support', 'typora-user-images', match[1]);
        const newImagePath = path.join(basePath, match[1]);
    
        // 复制图片
        fs.copyFileSync(oldImagePath, newImagePath);
    
        // 更新内容中的图片路径
        updatedContent = updatedContent.replace(match[0], `<img src="./${match[1]}" alt="${match[1]}" style="zoom:50%;" />`);
      }
    
      while ((match = imagePattern2.exec(content)) !== null) {
        const oldImagePath = path.join(os.homedir(), 'Library', 'Application Support', 'typora-user-images', match[2]);
        const newImagePath = path.join(basePath, match[2]);
    
        // 复制图片
        fs.copyFileSync(oldImagePath, newImagePath);
    
        // 更新内容中的图片路径
        updatedContent = updatedContent.replace(match[0], `![${match[1]}](./${match[2]})`);
      }
    
      return updatedContent;
    };
    

    const updatedImageContent = moveAndUpdateImagePaths(content, basePath);

    const headerPattern = /<h(\d) id="(.+?)">(.+?)<\/h\d>/g;
    let match;
    let toc = '';

    while ((match = headerPattern.exec(content)) !== null) {
      const level = parseInt(match[1], 10);
      const anchor = match[2].trim();
      const title = match[3].trim();

      toc += `${'  '.repeat(level - 1)}- [${title}](#${anchor})\n`;
    }

    console.log('生成的目录：\n', toc);

    // 查找第二个分隔符
    const separatorPattern = /---/g;
    let separatorCount = 0;
    let separatorEndIndex;

    while ((match = separatorPattern.exec(content)) !== null) {
      separatorCount++;
      if (separatorCount === 2) {
        separatorEndIndex = separatorPattern.lastIndex;
        break;
      }
    }

    // 在第二个分隔符下方插入目录
    const updatedContent = [
      updatedImageContent.slice(0, separatorEndIndex),
      toc,
      updatedImageContent.slice(separatorEndIndex),
    ].join('\n\n');

    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`目录已成功插入 "${filePath}" 文件！`);
  } catch (error) {
    console.error('读取文件或写入文件时出错：', error);
  }
};

// 替换以下文件路径为您要处理的本地Markdown文件的路径
const filePath = '/Users/bin/projects/gatsby-bbk-blog/content/blog/p-dialetc/辩证法.md';
generateTOC(filePath);
