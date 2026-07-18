const height = 151; // chiều cao tính bằng cm

if (height > 100) {
  const soLeHeight = height - 100; // số lẻ của chiều cao (phạm vi áp dụng cho chiều cao > 100)

  const lyTuongWeight = (soLeHeight * 9) / 10;
  const maxWeight = soLeHeight;
  const minWeight = (soLeHeight * 8) / 10;

//   console.log("Cân nặng lý tưởng: " + lyTuongWeight + " kg");
//   console.log("Cân nặng tối đa: " + maxWeight + " kg");
//   console.log("Cân nặng tối thiểu: " + minWeight + " kg");
     console.log("Cân nặng lý tưởng: " + lyTuongWeight + " kg, Cân nặng tối đa: " + maxWeight + " kg, Cân nặng tối thiểu: " + minWeight + " kg" );   
}