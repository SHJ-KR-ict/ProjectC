import React, { useState } from 'react'
import style from '../upboard/upboard.module.css'

interface FormData {
    num: number;
    title: string;
    writer: string;
    contents: string;
    reip?: string;
    hit?: number;
    gdate?: string;
    images: File[];
}

const FaqForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        num: 0,
        title: '',
        writer: '',
        contents: '',
        images: []
    });

    const [preview, setPreview] = useState<string[]>([]);

    const galleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        if (name === 'images' && files) {
            console.log(`AllNames : ${name} : ${value} | ${files[0]} : ${files[1]}`);
            console.log(`typeoffile => ${typeof (files)}`);
            console.log('---------------');
            const fileArray = Array.from(files);
            const filePreviews = fileArray.map(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                return new Promise<string>((resolve) => {
                    reader.onload = () => {
                        resolve(reader.result as string)
                    }
                });
            });

            Promise.all(filePreviews).then(pUrls => {
                setPreview(pUrls);
            })
            setFormData({ ...formData, images: fileArray })
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }
    return (
        <div className={style.container}>
            <h1 style={{ textAlign: 'center' }}>1대1 문의</h1>
            <form className={style.form}>
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input type="text" name="title" id="title" style={{ width: "95%" }} required
                                    className={style.input} />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="content" id="content"
                                    style={{ width: "95%", height: "150px", padding: "8px" }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>이미지</th>
                            <td>
                                <input
                                    className={style.input}
                                    type="file" name='images' multiple
                                    placeholder="이미지 URL 입력" onChange={galleryChange}
                                />
                                {
                                    preview.length > 0 && (
                                        <div className="mt-4" style={{ display: 'flex' }}>
                                            {
                                                preview.map((p, index) => (
                                                    <p key={index}>
                                                        <img src={p} alt='' className='img-thumbnail'
                                                            style={{ marginRight: '10px', marginBottom: '10px', width: '150px', height: '150px' }}
                                                        />
                                                        {/* <span>{p}</span> */}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2} style={{ textAlign: 'right' }}>
                                <button className={style.button}>등록하기</button>
                            </th>

                        </tr>

                    </tfoot>
                </table>
            </form>
        </div>
    )
}

export default FaqForm