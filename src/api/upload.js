export default function Upload(file) {
  const url = 'https://api.cloudinary.com/v1_1/dkow76s4k/image/upload';
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', 'scucq57o');
  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data.url); //promise는 then으로 받아줘야 안에 내용들을 추출할(extract) 수 있다
}
