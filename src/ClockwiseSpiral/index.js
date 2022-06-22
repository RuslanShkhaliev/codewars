export const createSpiral = (N) => {
	if (N === 1) {
		return [[1]];
	}
	if (N < 1 || Number.isNaN(N) || !Number.isInteger(N)) {
		return [];
	}

	const size = N ** 2;
	const matrix = Array(N)
		.fill(0)
		.map(() =>
			Array(N)
				.fill(0)
				.map((_, i) => '')
		);
	let startRow = 0;
	let startCol = 0;
	let endRow = N - 1;
	let endCol = N - 1;
	let count = 1;

	while (startRow <= endRow && startCol <= endCol) {
		for (let i = startCol; i <= endCol; i++) {
			matrix[startCol][i] = count++;
		}
		startRow++;

		for (let i = startRow; i <= endRow; i++) {
			matrix[i][endCol] = count++;
		}
		endCol--;
		for (let i = endCol; i >= startCol; i--) {
			matrix[endRow][i] = count++;
		}
		endRow--;
		for (let i = endRow; i >= startRow; i--) {
			matrix[i][startCol] = count++;
		}
		startCol++;
	}
	return matrix;
};
