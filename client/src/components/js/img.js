/** 이미지 미리보기 함수 */
const saveImgFile = () => {
  const imgLists = imgRef.current.files;
  let imageUrlLists = [...imgState];
  if (imgLists.length < 5) {
    for (let i = 0; i < imgLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imgLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    setImgState(imageUrlLists);
  } else {
    alert('이미지는 최대 4개 까지 등록 가능');
  }
};
