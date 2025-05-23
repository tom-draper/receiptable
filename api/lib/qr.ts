'use strict';

// Define a type for QRCode options
type QRCodeOptions = {
    msg?: string;                      // Message to encode
    ecl?: 'L' | 'M' | 'Q' | 'H';       // Error correction level
    ecb?: number;                      // Error correction boost
    dim?: number;                      // Dimension of QR code
    pad?: number;                      // Padding around QR code
    pal?: string[];                    // Color palette
    mtx?: number;                      // Matrix pattern
    vrb?: boolean;                     // Verbose (non-compact) rendering
};

export default function qrCodeSvg(input: string | QRCodeOptions): string {
    let version: number,                   // QR code version (1-40)
        errorCorrectionInfo: any,          // Error correction level info
        maskPattern: number,               // Mask pattern (0-7)
        size: number,                      // Size of QR code matrix
        qrMatrix: number[][] = [],         // QR code matrix
        reservedMatrix: number[][] = [],   // Reserved areas in QR code
        max = Math.max,
        min = Math.min,
        abs = Math.abs,
        ceil = Math.ceil;
        
    // Constants and lookup tables
    const NUMERIC_PATTERN = /^[0-9]*$/,
        ALPHANUMERIC_PATTERN = /^[A-Z0-9 $%*+.\/:-]*$/,
        ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",
        ERROR_CORRECTION_CODEWORDS = [
            [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
            [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
            [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
            [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        ],
        ERROR_CORRECTION_BLOCKS = [
            [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
            [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
            [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
            [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
        ],
        ERROR_CORRECTION_LEVELS = { L: [0, 1], M: [1, 0], Q: [2, 3], H: [3, 2] };

    // Galois field operations
    const calculateGaloisField = function (value: number, exponent: number): number {
        let result = 0;
        for (let bit = 8; bit--;) {
            result = result << 1 ^ 285 * (result >>> 7) ^ (exponent >>> bit & 1) * value;
        }
        return result;
    };

    // Error correction calculation
    const calculateErrorCorrection = function (data: number[], polynomial: number[]): number[] {
        const result = [];
        const dataLength = data.length;
        let remainingLength = dataLength;
        
        while (remainingLength) {
            for (let coefficient = data[dataLength - remainingLength--] ^ result.shift()!, p = polynomial.length; p--;) {
                result[p] ^= calculateGaloisField(polynomial[p], coefficient);
            }
        }
        
        return result;
    };

    // Apply mask pattern to QR code
    const applyMask = function (maskId: number): void {
        const maskFunctions = [
            function (row, col): number { return 0 == (row + col) % 2 ? 1 : 0 },
            function (row, col): number { return 0 == row % 2 ? 1 : 0 },
            function (row, col): number { return 0 == col % 3 ? 1 : 0 },
            function (row, col): number { return 0 == (row + col) % 3 ? 1 : 0 },
            function (row, col): number { return 0 == ((row / 2 | 0) + (col / 3 | 0)) % 2 ? 1 : 0 },
            function (row, col): number { return 0 == row * col % 2 + row * col % 3 ? 1 : 0 },
            function (row, col): number { return 0 == (row * col % 2 + row * col % 3) % 2 ? 1 : 0 },
            function (row, col): number { return 0 == ((row + col) % 2 + row * col % 3) % 2 ? 1 : 0 }
        ];
        
        const maskFunction = maskFunctions[maskId];
        let row = size;
        
        while (row--) {
            for (let col = size; col--;) {
                if (!reservedMatrix[row][col]) {
                    qrMatrix[row][col] ^= maskFunction(row, col);
                }
            }
        }
    };

    // Evaluate quality of QR code with applied mask
    const evaluateQRCodeQuality = function (): number {
        const updateConsecutive = function (count: number, consecutiveRun: number[]): void {
            if (!consecutiveRun[6]) {
                count += size;
            }
            consecutiveRun.shift();
            consecutiveRun.push(count);
        };
        
        const finishConsecutive = function (sameColor: boolean, count: number, consecutiveRun: number[]): number {
            if (sameColor) {
                updateConsecutive(count, consecutiveRun);
                count = 0;
            }
            updateConsecutive(count + size, consecutiveRun);
            return calculatePenaltyScore(consecutiveRun);
        };
        
        const calculatePenaltyScore = function (consecutiveRun: number[]): number {
            const threshold = consecutiveRun[5];
            const hasLongRun = threshold > 0 && 
                               consecutiveRun[4] == threshold && 
                               consecutiveRun[3] == 3 * threshold && 
                               consecutiveRun[2] == threshold && 
                               consecutiveRun[1] == threshold;
                               
            return (hasLongRun && consecutiveRun[6] >= 4 * threshold && consecutiveRun[0] >= threshold ? 1 : 0) + 
                   (hasLongRun && consecutiveRun[0] >= 4 * threshold && consecutiveRun[6] >= threshold ? 1 : 0);
        };
        
        let penaltyScore = 0;
        const totalModules = size * size;
        let darkCount = 0;
        
        for (let row = size; row--;) {
            const rowConsecutive = [0, 0, 0, 0, 0, 0, 0];
            const colConsecutive = [0, 0, 0, 0, 0, 0, 0];
            let lastRowColor = false;
            let lastColColor = false;
            let rowRun = 0;
            let colRun = 0;
            
            for (let col = size; col--;) {
                // Check row-wise consecutive modules
                if (qrMatrix[row][col] == lastRowColor) {
                    rowRun >= 5 ? penaltyScore += 3 : rowRun > 5 && penaltyScore++;
                    rowRun++;
                } else {
                    updateConsecutive(rowRun, rowConsecutive);
                    penaltyScore += 40 * calculatePenaltyScore(rowConsecutive);
                    rowRun = 1;
                    lastRowColor = qrMatrix[row][col];
                }
                
                // Check column-wise consecutive modules
                if (qrMatrix[col][row] == lastColColor) {
                    colRun >= 5 ? penaltyScore += 3 : colRun > 5 && penaltyScore++;
                    colRun++;
                } else {
                    updateConsecutive(colRun, colConsecutive);
                    penaltyScore += 40 * calculatePenaltyScore(colConsecutive);
                    colRun = 1;
                    lastColColor = qrMatrix[col][row];
                }
                
                // Count dark modules and check 2x2 patterns
                const currentModule = qrMatrix[row][col];
                if (currentModule) {
                    darkCount++;
                }
                
                if (col && row && currentModule == qrMatrix[row][col - 1] && 
                               currentModule == qrMatrix[row - 1][col] && 
                               currentModule == qrMatrix[row - 1][col - 1]) {
                    penaltyScore += 3;
                }
            }
            
            penaltyScore += 40 * finishConsecutive(lastRowColor, rowRun, rowConsecutive) + 
                           40 * finishConsecutive(lastColColor, colRun, colConsecutive);
        }
        
        // Dark module ratio penalty
        penaltyScore += 10 * (ceil(abs(20 * darkCount - 10 * totalModules) / totalModules) - 1);
        
        return penaltyScore;
    };

    // Convert data to binary
    const appendBits = function (value: number, bitLength: number, bitArray: number[]): void {
        while (bitLength--) {
            bitArray.push(value >>> bitLength & 1);
        }
    };

    // Get bit count for character count indicator
    const getCharCountBits = function (mode: any, version: number): number {
        return mode.numBitsCharCount[(version + 7) / 17 | 0];
    };

    // Check bit at position
    const getBit = function (value: number, position: number): number {
        return 0 != (value >>> position & 1) ? 1 : 0;
    };

    // Calculate total bits required for encoding
    const calculateBitLength = function (segments: any[], version: number): number {
        let totalBits = 0;
        
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const charCountBits = getCharCountBits(segment, version);
            
            if (1 << charCountBits <= segment.numChars) {
                return Infinity;
            }
            
            totalBits += 4 + charCountBits + segment.bitData.length;
        }
        
        return totalBits;
    };

    // Calculate QR code capacity
    const calculateCapacity = function (version: number): number {
        if (version < 1 || version > 40) {
            throw "Version number out of range";
        }
        
        let capacity = (16 * version + 128) * version + 64;
        
        if (version >= 2) {
            const alignmentPatterns = version / 7 | 2;
            capacity -= (25 * alignmentPatterns - 10) * alignmentPatterns - 55;
            
            if (version >= 7) {
                capacity -= 36;
            }
        }
        
        return capacity;
    };

    // Draw finder pattern at the coordinates
    const drawFinderPattern = function (x: number, y: number): void {
        for (let dy = 2; dy >= -2; dy--) {
            for (let dx = 2; dx >= -2; dx--) {
                const distance = max(abs(dx), abs(dy));
                setModule(x + dx, y + dy, distance != 1);
            }
        }
    };

    // Draw alignment pattern at the coordinates
    const drawAlignmentPattern = function (x: number, y: number): void {
        for (let dy = 4; dy >= -4; dy--) {
            for (let dx = 4; dx >= -4; dx--) {
                const distance = max(abs(dx), abs(dy));
                const moduleX = x + dx;
                const moduleY = y + dy;
                
                if (0 <= moduleX && moduleX < size && 0 <= moduleY && moduleY < size) {
                    setModule(moduleX, moduleY, distance != 2 && distance != 4);
                }
            }
        }
    };

    // Draw format information
    const drawFormatInfo = function (maskId: number): void {
        const formatData = errorCorrectionInfo[1] << 3 | maskId;
        let formatBits = formatData;
        
        // Calculate error correction bits for format information
        for (let i = 10; i--;) {
            formatBits = formatBits << 1 ^ 1335 * (formatBits >>> 9);
        }
        
        const formatInfo = 21522 ^ (formatData << 10 | formatBits);
        
        if (formatInfo >>> 15 != 0) {
            throw "Assertion error";
        }
        
        // Draw format info around the QR code
        for (let i = 0; i <= 5; i++) {
            setModule(8, i, getBit(formatInfo, i));
        }
        
        setModule(8, 7, getBit(formatInfo, 6));
        setModule(8, 8, getBit(formatInfo, 7));
        setModule(7, 8, getBit(formatInfo, 8));
        
        for (let i = 9; i < 15; i++) {
            setModule(14 - i, 8, getBit(formatInfo, i));
        }
        
        for (let i = 0; i < 8; i++) {
            setModule(size - 1 - i, 8, getBit(formatInfo, i));
        }
        
        for (let i = 8; i < 15; i++) {
            setModule(8, size - 15 + i, getBit(formatInfo, i));
        }
        
        // Dark module that is always present
        setModule(8, size - 8, 1);
    };

    // Draw the static patterns (finders, alignment, timing)
    const drawStaticPatterns = function (): void {
        // Initialize matrices
        for (let i = size; i--;) {
            qrMatrix[i] = [];
            reservedMatrix[i] = [];
        }
        
        // Draw finder patterns
        drawFinderPattern(3, 3);
        drawFinderPattern(size - 4, 3);
        drawFinderPattern(3, size - 4);
        
        // Draw alignment patterns
        const alignmentPositions = getAlignmentPatternPositions();
        const alignmentCount = alignmentPositions.length;
        
        for (let i = alignmentCount; i--;) {
            for (let j = alignmentCount; j--;) {
                if (!(j == 0 && i == 0 || j == 0 && i == alignmentCount - 1 || j == alignmentCount - 1 && i == 0)) {
                    drawAlignmentPattern(alignmentPositions[j], alignmentPositions[i]);
                }
            }
        }
        
        // Draw timing patterns
        for (let i = size; i--;) {
            setModule(6, i, 0 == i % 2);
            setModule(i, 6, 0 == i % 2);
        }
        
        // Draw format information
        drawFormatInfo(0);
        
        // Draw version information (for QR codes >= version 7)
        drawVersionInfo();
    };
    
    // Get alignment pattern positions
    const getAlignmentPatternPositions = function (): number[] {
        const positions: number[] = [];
        
        if (version > 1) {
            const count = 2 + (version / 7 | 0);
            const step = (version == 32) ? 26 : 2 * ceil((size - 13) / (2 * count - 2));
            
            for (let i = count; i--;) {
                positions[i] = i * step + 6;
            }
        }
        
        return positions;
    };
    
    // Draw version information for QR codes >= version 7
    const drawVersionInfo = function (): void {
        if (version < 7) return;
        
        // Calculate version error correction
        let versionBits = version;
        
        for (let i = 12; i--;) {
            versionBits = versionBits << 1 ^ 7973 * (versionBits >>> 11);
        }
        
        const versionInfo = version << 12 | versionBits;
        
        if (versionInfo >>> 18 != 0) {
            throw "Assertion error";
        }
        
        // Draw version info at the bottom-left and top-right corners
        for (let i = 18; i--;) {
            const bit = getBit(versionInfo, i);
            const posX = size - 11 + i % 3;
            const posY = i / 3 | 0;
            
            setModule(posX, posY, bit);
            setModule(posY, posX, bit);
        }
    };

    // Process data and generate QR code
    const generateQRCode = function (data: number[]): number[] {
        if (data.length != calculateDataCapacity(version, errorCorrectionInfo)) {
            throw "Invalid argument";
        }
        
        const ecBlocks = ERROR_CORRECTION_BLOCKS[errorCorrectionInfo[0]][version];
        const ecWords = ERROR_CORRECTION_CODEWORDS[errorCorrectionInfo[0]][version];
        const dataCapacity = calculateCapacity(version) / 8 | 0;
        const shortBlockLength = dataCapacity / ecBlocks | 0;
        const shortBlocksCount = ecBlocks - dataCapacity % ecBlocks;
        const result = [];
        
        // Generate and interleave error correction blocks
        const errorCorrectionPolynomial = generateErrorCorrectionPolynomial(ecWords);
        let dataIndex = 0;
        
        for (let block = 0; block < ecBlocks; block++) {
            const blockLength = shortBlockLength - ecWords + (block < shortBlocksCount ? 0 : 1);
            const blockData = data.slice(dataIndex, dataIndex + blockLength);
            dataIndex += blockData.length;
            
            const ecData = calculateErrorCorrection(blockData, errorCorrectionPolynomial);
            block < shortBlocksCount && blockData.push(0);
            result.push(blockData.concat(ecData));
        }
        
        // Interleave blocks
        const interleavedData = [];
        
        for (let byteIndex = 0; byteIndex < result[0].length; byteIndex++) {
            for (let block = 0; block < result.length; block++) {
                if (byteIndex != shortBlockLength - ecWords || block >= shortBlocksCount) {
                    interleavedData.push(result[block][byteIndex]);
                }
            }
        }
        
        return interleavedData;
    };
    
    // Generate error correction polynomial
    const generateErrorCorrectionPolynomial = function (degree: number): number[] {
        let product = 1;
        const polynomial: number[] = [];
        
        polynomial[degree - 1] = 1;
        
        for (let i = 0; i < degree; i++) {
            for (let j = 0; j < degree; j++) {
                polynomial[j] = calculateGaloisField(polynomial[j], product) ^ (polynomial[j + 1] || 0);
            }
            product = calculateGaloisField(product, 2);
        }
        
        return polynomial;
    };

    // Convert string to UTF-8 bytes
    const toUTF8Bytes = function (str: string): number[] {
        const bytes = [];
        str = encodeURI(str);
        
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) != "%") {
                bytes.push(str.charCodeAt(i));
            } else {
                bytes.push(parseInt(str.substr(i + 1, 2), 16));
                i += 2;
            }
        }
        
        return bytes;
    };

    // Calculate data capacity of QR code
    const calculateDataCapacity = function (version: number, ecLevel: number[]): number {
        return (calculateCapacity(version) / 8 | 0) - ERROR_CORRECTION_CODEWORDS[ecLevel[0]][version] * ERROR_CORRECTION_BLOCKS[ecLevel[0]][version];
    };

    // Set module in QR matrix
    const setModule = function (x: number, y: number, isDark: number | boolean): void {
        qrMatrix[y][x] = isDark ? 1 : 0;
        reservedMatrix[y][x] = 1;
    };

    // Encode data in byte mode
    const encodeByteModeData = function (data: number[]): any {
        const bitArray: number[] = [];
        
        for (let i = 0; i < data.length; i++) {
            appendBits(data[i], 8, bitArray);
        }
        
        return {
            modeBits: 4,
            numBitsCharCount: [8, 16, 16],
            numChars: data.length,
            bitData: bitArray
        };
    };

    // Encode data in numeric mode
    const encodeNumericModeData = function (str: string): any {
        if (!NUMERIC_PATTERN.test(str)) {
            throw "String contains non-numeric characters";
        }
        
        const bitArray: number[] = [];
        
        for (let i = 0; i < str.length;) {
            const groupSize = min(str.length - i, 3);
            appendBits(parseInt(str.substr(i, groupSize), 10), 3 * groupSize + 1, bitArray);
            i += groupSize;
        }
        
        return {
            modeBits: 1,
            numBitsCharCount: [10, 12, 14],
            numChars: str.length,
            bitData: bitArray
        };
    };

    // Encode data in alphanumeric mode
    const encodeAlphanumericModeData = function (str: string): any {
        if (!ALPHANUMERIC_PATTERN.test(str)) {
            throw "String contains unencodable characters in alphanumeric mode";
        }
        
        const bitArray: number[] = [];
        
        for (let i = 0; i + 2 <= str.length; i += 2) {
            const value = 45 * ALPHANUMERIC_CHARS.indexOf(str.charAt(i));
            value += ALPHANUMERIC_CHARS.indexOf(str.charAt(i + 1));
            appendBits(value, 11, bitArray);
        }
        
        if (i < str.length) {
            appendBits(ALPHANUMERIC_CHARS.indexOf(str.charAt(i)), 6, bitArray);
        }
        
        return {
            modeBits: 2,
            numBitsCharCount: [9, 11, 13],
            numChars: str.length,
            bitData: bitArray
        };
    };

    // Segment and encode data
    const encodeText = function (text: string, ecLevel: number[], autoMode: number, maskId: number): void {
        const segments = getDataSegments(text);
        return encodeSegments(segments, ecLevel, autoMode, maskId);
    };
    
    // Get optimal data segments for encoding
    const getDataSegments = function (text: string): any[] {
        if (text === "") return [];
        
        if (NUMERIC_PATTERN.test(text)) {
            return [encodeNumericModeData(text)];
        } else if (ALPHANUMERIC_PATTERN.test(text)) {
            return [encodeAlphanumericModeData(text)];
        } else {
            return [encodeByteModeData(toUTF8Bytes(text))];
        }
    };

    // Draw QR code matrix
    const drawQRCodeMatrix = function (currentVersion: number, ecLevel: number[], codeData: number[], selectedMask: number): void {
        errorCorrectionInfo = ecLevel;
        maskPattern = selectedMask;
        size = 4 * (version = currentVersion) + 17;
        
        // Initialize matrices
        for (let i = size; i--;) {
            qrMatrix[i] = [];
            reservedMatrix[i] = [];
        }
        
        // Draw static patterns
        drawStaticPatterns();
        
        // Fill data bits
        fillDataBits(generateQRCode(codeData));
        
        // If mask pattern is not specified (-1), find the best one
        if (maskPattern < 0) {
            let minPenalty = 1e9;
            
            for (let maskId = 8; maskId--;) {
                applyMask(maskId);
                drawFormatInfo(maskId);
                
                const penalty = evaluateQRCodeQuality();
                
                if (minPenalty > penalty) {
                    minPenalty = penalty;
                    maskPattern = maskId;
                }
                
                applyMask(maskId); // Revert mask
            }
        }
        
        // Apply final mask and format info
        applyMask(maskPattern);
        drawFormatInfo(maskPattern);
        
        // Clear reserved matrix as it's no longer needed
        reservedMatrix = [];
    };
    
    // Fill data bits into QR matrix
    const fillDataBits = function (data: number[]): void {
        let bitIndex = 0;
        let xDir = 1; // Start right-to-left
        let x = size - 1;
        let y = size - 1;
        
        // Traverse the matrix in zigzag
        while (x > 0) {
            // Skip vertical timing pattern
            if (x == 6) x--;
            
            while (y >= 0 && y < size) {
                for (let i = 0; i < 2; i++) {
                    const currentX = x - i;
                    
                    if (!reservedMatrix[y][currentX]) {
                        qrMatrix[y][currentX] = getBit(data[bitIndex >>> 3], 7 - (7 & bitIndex));
                        bitIndex++;
                    }
                }
                
                y += xDir;
            }
            
            xDir = -xDir; // Change vertical direction
            y += xDir;    // Adjust y after boundary check
            x -= 2;       // Move to next column pair
        }
    };

    // Encode data segments into QR code
    const encodeSegments = function (
        segments: any[], 
        ecLevel: number[], 
        autoSelectMode: boolean, 
        mask: number,
        minVersion: number = 1,
        maxVersion: number = 40
    ): void {
        // Validate parameters
        if (!(1 <= minVersion && minVersion <= maxVersion && maxVersion <= 40) || mask < -1 || mask > 7) {
            throw "Invalid value";
        }
        
        // Find minimum version that can fit the data
        let currentVersion = minVersion;
        
        while (true) {
            const bitLength = calculateBitLength(segments, currentVersion);
            
            if (bitLength <= 8 * calculateDataCapacity(currentVersion, ecLevel)) {
                break;
            }
            
            if (currentVersion >= maxVersion) {
                throw "Data too long";
            }
            
            currentVersion++;
        }
        
        // Auto-select error correction level if needed
        if (autoSelectMode) {
            const levelOptions = [
                ERROR_CORRECTION_LEVELS.H, 
                ERROR_CORRECTION_LEVELS.Q, 
                ERROR_CORRECTION_LEVELS.M
            ];
            
            for (let i = 0; i < levelOptions.length; i++) {
                if (calculateBitLength(segments, currentVersion) <= 8 * calculateDataCapacity(currentVersion, levelOptions[i])) {
                    ecLevel = levelOptions[i];
                    break;
                }
            }
        }
        
        // Convert segments to bit array
        const bitArray: number[] = [];
        let alternatorByte = 236;
        const codeData: number[] = [];
        
        // Add each segment to the bit array
        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            
            appendBits(segment.modeBits, 4, bitArray);
            appendBits(segment.numChars, getCharCountBits(segment, currentVersion), bitArray);
            
            for (let j = 0; j < segment.bitData.length; j++) {
                bitArray.push(segment.bitData[j]);
            }
        }
        
        // Validation check
        if (bitArray.length !== calculateBitLength(segments, currentVersion)) {
            throw "Assertion error";
        }
        
        // Calculate padding length
        const dataCapacity = 8 * calculateDataCapacity(currentVersion, ecLevel);
        
        if (bitArray.length > dataCapacity) {
            throw "Assertion error";
        }
        
        // Add terminator and pad to byte boundaries
        appendBits(0, min(4, dataCapacity - bitArray.length), bitArray);
        appendBits(0, (8 - bitArray.length % 8) % 8, bitArray);
        
        if (bitArray.length % 8 !== 0) {
            throw "Assertion error";
        }
        
        // Add padding bytes
        while (bitArray.length < dataCapacity) {
            appendBits(alternatorByte, 8, bitArray);
            alternatorByte ^= 253; // Toggle between 236 and 17
        }
        
        // Convert bit array to bytes
        for (let i = 0; i < bitArray.length; i += 8) {
            let byte = 0;
            for (let j = 0; j < 8; j++) {
                byte |= bitArray[i + j] << (7 - j);
            }
            codeData[i >>> 3] = byte;
        }
        
        // Generate QR code matrix
        drawQRCodeMatrix(currentVersion, ecLevel, codeData, mask);
    };

    return function() {
        function isValidColor(color: string): boolean {
            return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(color);
        }

        const svgNS = "http://www.w3.org/2000/svg";
        let pathData = "";
        const options = typeof input === "string" ? { msg: input } : input || {};
        const colors = options.pal || ["#484848"];
        const qrSize = abs(options.dim) || 160;
        const padding = (abs(options.pad) > -1) ? abs(options.pad) : 0;
        const transform = [1, 0, 0, 1, padding, padding];
        const fillColor = isValidColor(colors[0]) ? colors[0] : "#484848";
        const backgroundColor = isValidColor(colors[1]) ? colors[1] : null;
        const compact = options.vrb ? 0 : 1;

        // Generate QR code data
        encodeText(
            options.msg || "hello", 
            ERROR_CORRECTION_LEVELS[options.ecl as keyof typeof ERROR_CORRECTION_LEVELS] || ERROR_CORRECTION_LEVELS.M, 
            options.ecb === 0 ? 0 : 1, 
            options.mtx as number || 5
        );

        const totalSize = qrSize + 2 * padding;

        // Generate path data for SVG
        for (let row = qrSize; row--;) {
            let consecutiveModules = 0;
            
            for (let col = 0, remaining = size; remaining--;) {
                if (qrMatrix[row][col]) {
                    if (compact) {
                        consecutiveModules++;
                        
                        // If next module is not dark or reached the end, add path
                        if (!qrMatrix[row][col - 1]) {
                            pathData += `M${col}${row}h${consecutiveModules}v1h-${consecutiveModules}v-1z`;
                            consecutiveModules = 0;
                        }
                    } else {
                        pathData += `M${col}${row}h1v1h-1v-1z`;
                    }
                }
                col++;
            }
        }

        // Create the SVG string
        const viewBox = [0, 0, totalSize, totalSize].join(" ");
        let svgString = `<svg xmlns="${svgNS}" viewBox="${viewBox}" width="${qrSize}" height="${qrSize}" fill="${fillColor}" shape-rendering="crispEdges" version="1.1">`;

        if (backgroundColor) {
            svgString += `<path fill="${backgroundColor}" d="M0,0V${totalSize}H${totalSize}V0H0Z"/>`;
        }

        svgString += `<path transform="matrix(${transform})" d="${pathData}"/>`;
        svgString += '</svg>';

        // Return SVG string
        return svgString;
    }();
}