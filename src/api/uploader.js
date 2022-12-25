export async function uploadImage(file) {
  const url = 'https://api.cloudinary.com/v1_1/dkow76s4k/image/upload';
  const data = new FormData();

  data.append('file', file);
  data.append('upload_preset', 'scucq57o');
  
  return fetch(url, {
    method: 'POST',
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url); //promise는 then으로 받아줘야 안에 내용들을 추출할(extract) 수 있다
}
