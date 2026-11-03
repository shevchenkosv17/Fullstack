console.log('#59. JavaScript homework example file');

import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';

async function getUniqueFilePath(targetPath) {
  let counter = 0;
  let uniquePath = targetPath;
  const ext = path.extname(targetPath);
  const dir = path.dirname(targetPath);
  const base = path.basename(targetPath, ext);

  while (true) {
    try {
      await fs.access(uniquePath);
      counter++;
      uniquePath = path.join(dir, `${base}(${counter})${ext}`);
    } catch {
      return uniquePath;
    }
  }
}

async function compressFile(filePath) {
  try {
    await fs.access(filePath);
    const targetPath = `${filePath}.gz`;
    const uniqueGzipPath = await getUniqueFilePath(targetPath);
    const sourceStream = createReadStream(filePath);
    const gzipStream = zlib.createGzip();
    const destinationStream = createWriteStream(uniqueGzipPath);

    await pipeline(sourceStream, gzipStream, destinationStream);
    return uniqueGzipPath;
  } catch (error) {
    throw new Error(`Помилка компресії: ${error.message}`);
  }
}

async function decompressFile(compressedFilePath, destinationFilePath) {
  try {
    await fs.access(compressedFilePath);
    const destDir = path.dirname(destinationFilePath);
    await fs.mkdir(destDir, { recursive: true });
    const uniqueDestPath = await getUniqueFilePath(destinationFilePath);
    const sourceStream = createReadStream(compressedFilePath);
    const gunzipStream = zlib.createGunzip();
    const destinationStream = createWriteStream(uniqueDestPath);

    await pipeline(sourceStream, gunzipStream, destinationStream);
    return uniqueDestPath;
  } catch (error) {
    throw new Error(`Помилка декомпресії: ${error.message}`);
  }
}

async function performCompressionAndDecompression() {
  try {
    await fs.mkdir('./files', { recursive: true });
    await fs.writeFile('./files/source.txt', 'Привіт! Це тестовий файл для перевірки домашнього завдання.');

    const compressedResult = await compressFile('./files/source.txt');
    console.log(`Файл успішно стиснуто: ${compressedResult}`);

    const decompressedResult = await decompressFile(compressedResult, './files/source_decompressed.txt');
    console.log(`Файл успішно розархівовано: ${decompressedResult}`);
  } catch (error) {
    console.error('Сталася помилка під час виконання програми:', error);
  }
}

performCompressionAndDecompression();

export { compressFile, decompressFile };
