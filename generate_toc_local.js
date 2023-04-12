const fs = require('fs');
const path = require('path');

// 目录生成脚本
const generateTOC = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
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
      content.slice(0, separatorEndIndex),
      toc,
      content.slice(separatorEndIndex),
    ].join('\n\n');

    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`目录已成功插入 "${filePath}" 文件！`);
  } catch (error) {
    console.error('读取文件或写入文件时出错：', error);
  }
};

// 替换以下文件路径为您要处理的本地Markdown文件的路径
const filePath = '/Users/bin/projects/gatsby-bbk-blog/content/blog/3-stutz/Stutz.md';
generateTOC(filePath);
