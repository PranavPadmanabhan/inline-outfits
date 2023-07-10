import { useAppContext } from "@/contexts/AppContext";
import { useStorageUpload } from "@thirdweb-dev/react";
import { CloseCircle } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImSpinner4 } from "react-icons/im";

type Color = {
  name: string;
  code: string;
};

type States = {
  name: string;
  description: string;
  price: {
    original: string | number;
    offer: string | number;
  };
  colors: Color[];
};

type Details = {
  neckType: string;
  sleeveType: string;
  fabricCare: string;
  fit: string;
  fabric: string;
};

function ProductUpload({
  isUpdating,
  product,
}: {
  isUpdating: boolean;
  product?: any;
}) {
  const { setIsProductUploadModalVisible } = useAppContext();
  const [states, setStates] = useState<States>({
    colors: [],
    description: "",
    name: "",
    price: {
      offer: "",
      original: "",
    },
  });
  const [details, setDetails] = useState<Details>({
    fabric: "",
    fabricCare: "",
    fit: "",
    neckType: "",
    sleeveType: "",
  });

  const [color, setColor] = useState<Color>({
    code: "",
    name: "",
  });
  const [sizes, setSizes] = useState<string[]>([
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [productImages, setProductImages] = useState<any[]>([]);

  const { mutateAsync: upload, isLoading, isSuccess } = useStorageUpload();

  useEffect(() => {
    if (isUpdating && product) {
      setStates({
        colors: product?.colors,
        description: product?.description,
        name: product?.name,
        price: product.price,
      });
      setDetails({
        fabric: product?.details?.fabric,
        fabricCare: product?.details?.fabricCare,
        fit: product?.details?.fit,
        neckType: product?.details?.neckType,
        sleeveType: product?.details?.sleeveType,
      });
      setSelectedSizes(product.sizes);
      setProductImages(product?.images);
    }
  }, []);

  const addSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((item) => item !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const uploadFile = async (images: any) => {
    const uploadedData = await upload({
      data: images,
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: false,
        onProgress(event) {
          if (event.progress < event.total) {
            setUploading(true);
          } else if (event.progress == event.total) {
            setUploading(false);
          } else {
            setUploading(false);
          }
        },
      },
    });
    return uploadedData;
  };

  const addProduct = async (isUpdating: boolean, product?: any) => {
    const admin = JSON.parse(localStorage.getItem("admin")!);
    if (isUpdating && product) {
      let body: any;
      Object.values(states).map((item, i) => {
        if (item !== product[Object.keys(states)[i]]) {
          body = { ...body, [Object.keys(states)[i]]: item };
        }
      });
      Object.values(details).map((item, i) => {
        if (item !== product[Object.keys(details)[i]]) {
          body = { ...body, [Object.keys(details)[i]]: item };
        }
      });
      if (selectedSizes !== product.sizes) {
        body = { ...body, sizes: selectedSizes };
      }
      try {
        setLoading(true);
        const stills = await uploadFile(images);
        if (stills.length > 0 && stills !== productImages) {
          body = { ...body, images: stills };
        }
        body = { ...body, productId: product?.productId, phone: admin?.phone };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/product/update`,
          {
            method: "put",
            body: JSON.stringify(body),
            headers: {
              apikey: process.env.NEXT_PUBLIC_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (!data.error) {
          setIsProductUploadModalVisible(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsProductUploadModalVisible(false);
      }
    } else {
      try {
        if (
          Object.keys(admin).length > 0 &&
          states.colors.length > 0 &&
          states.description.trim().length > 0 &&
          states.price.original.toString().trim().length > 0 &&
          states.price.offer.toString().trim().length > 0 &&
          states.name.trim().length > 0 &&
          details.fabric.trim().length > 0 &&
          details.fabricCare.trim().length > 0 &&
          details.fit.trim().length > 0 &&
          details.neckType.trim().length > 0 &&
          details.sleeveType.trim().length > 0
        ) {
          setLoading(true);
          const stills = await uploadFile(images);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/admin`,
            {
              method: "post",
              body: JSON.stringify({
                ...states,
                phone: admin?.phone,
                images: stills,
                sizes: selectedSizes,
                details,
              }),
              headers: {
                apikey: process.env.NEXT_PUBLIC_API_KEY!,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          if (!data.error) {
            setIsProductUploadModalVisible(false);
          }
          setLoading(false);
        } else {
        }
      } catch (error) {
        setLoading(false);
        setIsProductUploadModalVisible(false);
      }
    }
  };

  return (
    <div className="fixed top-0 z-[100] h-[100vh] w-[100vw] bg-[#0000005b] flex items-center justify-center">
      <div className="relative h-[70%] w-[70%] bg-white   rounded-md flex items-center justify-center p-5 box-border ">
        <CloseCircle
          onClick={() => setIsProductUploadModalVisible(false)}
          className="absolute cursor-pointer top-4 right-4 "
          size="25"
          color="black"
        />
        <div className="h-full w-[50%] flex flex-col items-start justify-start ">
          <h1 className=" text-black text-[1.3rem] font-[600]  my-1 ">
            Upload Product
          </h1>
          <input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
            type="text"
            value={states.name}
            placeholder="Product Name"
            onChange={(e) => setStates({ ...states, name: e.target.value })}
          />
          <input
            className="text-[0.7rem] text-black h-[70px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
            type="text"
            value={states.description}
            placeholder="Product Description"
            onChange={(e) =>
              setStates({ ...states, description: e.target.value })
            }
          />
          <div className="h-[40px] w-[70%] flex items-center justify-between">
            <input
              className="text-[0.7rem] text-black h-full w-[48%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
              type="text"
              placeholder="Actual Amount"
              value={states.price.original}
              onChange={(e) =>
                setStates({
                  ...states,
                  price: { ...states.price, original: e.target.value },
                })
              }
            />
            <input
              className="text-[0.7rem] text-black h-full w-[48%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-1"
              type="text"
              placeholder="Offer Amount"
              value={states.price.offer}
              onChange={(e) =>
                setStates({
                  ...states,
                  price: { ...states.price, offer: e.target.value },
                })
              }
            />
          </div>
          <h1 className="text-[0.7rem] text-[#818080] my-2 ml-1">
            Available Colors
          </h1>
          {states.colors.length > 0 && (
            <div className="h-[36px] w-[70%] flex items-center justify-start">
              {states.colors.map((item: any, i: number) => (
                <div
                  key={i}
                  className="relative min-h-[45px] min-w-[35px] rounded-full mx-1 flex flex-col items-center justify-start"
                >
                  <div
                    style={{ backgroundColor: item?.code }}
                    className="h-[35px] w-[35px] rounded-full "
                  ></div>
                  <div
                    onClick={() =>
                      setStates({
                        ...states,
                        colors: states.colors.filter((color) => color !== item),
                      })
                    }
                    className="absolute -top-[2px] -right-[2px] h-[15px] w-[15px] rounded-full bg-gray-300 flex items-center justify-center"
                  >
                    <FaPlus
                      color="black"
                      size={10}
                      className="rotate-45 cursor-pointer "
                    />
                  </div>
                  <span className="text-black text-[0.7rem]">{item?.name}</span>
                </div>
              ))}
            </div>
          )}
          <div className="w-full h-auto flex items-center justify-start gap-x-3">
            <div className="text-[0.7rem] text-[#807979] h-[40px] w-[50%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1]  px-1 box-border my-2 flex items-center justify-between overflow-hidden">
              <input
                value={color.name}
                onChange={(e) => setColor({ ...color, name: e.target.value })}
                type="text"
                placeholder="name"
                className="w-full h-full focus:outline-none text-black bg-transparent"
              />
              <input
                value={color.code}
                onChange={(e) => setColor({ ...color, code: e.target.value })}
                className="h-full w-[20%] focus:outline-none border-none"
                type="color"
                name=""
                id=""
              />
            </div>
            <button
              onClick={() => {
                if (
                  color.code.trim().length > 0 &&
                  color.name.trim().length > 0
                ) {
                  setStates({ ...states, colors: [...states.colors, color] });
                  setColor({ code: "", name: "" });
                } else {
                  return;
                }
              }}
              className="min-w-[70px] min-h-[40px] rounded-md bg-black text-white"
            >
              Add
            </button>
          </div>
          <h1 className="text-[0.7rem] text-[#818080] my-1 ml-1">
            Available Sizes
          </h1>

          <div className="h-[36px] w-[75%] flex items-center justify-start">
            {sizes.map((item, i) => (
              <div
                onClick={() => addSize(item)}
                key={i}
                className={`h-[38px] ${
                  selectedSizes.includes(item)
                    ? "border-[2px] border-blue-800 text-blue-800"
                    : "border-[1px] border-black text-black"
                } w-[38px] cursor-pointer rounded-full mx-1 flex items-center justify-center text-[0.8rem]`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="relative text-[0.7rem] text-[#807979] min-h-[40px] w-[60%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1]  px-1 box-border my-2 flex items-center justify-between ">
            Choose Image File
            <input
              onChange={(e) => {
                if (!e.target.files) {
                  return;
                }
                setImages(Object.values(e.target.files));
              }}
              type="file"
              accept="image/*"
              multiple
              name=""
              id=""
              className="absolute w-full h-full top-0 z-[100] opacity-0"
            />
            <button className="h-[90%] w-[80px] bg-black  flex items-center justify-center rounded-md text-white">
              {uploading ? (
                <>
                  <span className="text-white text-[0.6rem] mr-1">
                    uploading
                  </span>
                  <ImSpinner4
                    color="white"
                    size={17}
                    className="animate-rotate"
                  />
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>

        <div className="h-full w-[50%] flex flex-col items-start justify-start ">
          <input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2 mt-10"
            type="text"
            placeholder="Neck Type"
            value={details.neckType}
            onChange={(e) =>
              setDetails({ ...details, neckType: e.target.value })
            }
          />

          <input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Sleeve Type"
            value={details.sleeveType}
            onChange={(e) =>
              setDetails({ ...details, sleeveType: e.target.value })
            }
          />

          <input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Fit"
            value={details.fit}
            onChange={(e) => setDetails({ ...details, fit: e.target.value })}
          />

          <input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Fabric Type"
            value={details.fabric}
            onChange={(e) => setDetails({ ...details, fabric: e.target.value })}
          />

          <input
            className="text-[0.7rem] text-black h-[40px] w-[90%] rounded-lg border-[1px] border-[#0000001a] bg-[#F1F1F1] outline-none p-3 box-border my-2"
            type="text"
            placeholder="Fabric Care"
            value={details.fabricCare}
            onChange={(e) =>
              setDetails({ ...details, fabricCare: e.target.value })
            }
          />
          <div className="min-h-[80px] overflow-x-scroll scrollbar-hide w-[90%] flex items-center justify-start gap-x-4 pt-2 box-border">
            {productImages.map((item: any, i: number) => (
              <div
                key={i}
                style={{ backgroundImage: `url(${item})` }}
                className="relative h-full w-[65px] border-[1px] border-gray-400 rounded-md bg-center bg-no-repeat bg-cover"
              >
                <div
                  onClick={() =>
                    setImages(images.filter((image) => item !== image))
                  }
                  className="absolute h-[20px] w-[20px] -top-[8px] -right-[8px] rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                >
                  <FaPlus color="black" size={16} className="rotate-45" />
                </div>
              </div>
            ))}
            {images.map((item: any, i: number) => (
              <div
                key={i}
                style={{ backgroundImage: `url(${URL.createObjectURL(item)})` }}
                className="relative h-full w-[65px] border-[1px] border-gray-400 rounded-md bg-center bg-no-repeat bg-cover"
              >
                <div
                  onClick={() =>
                    setImages(images.filter((image) => item !== image))
                  }
                  className="absolute h-[20px] w-[20px] -top-[8px] -right-[8px] rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                >
                  <FaPlus color="black" size={16} className="rotate-45" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => addProduct(isUpdating, product)}
            className="self-end mr-10 min-h-[35px] w-[100px] bg-black text-white rounded-md flex items-center justify-center text-[0.7rem] my-3"
          >
            {loading ? (
              <ImSpinner4 color="white" size={22} className="animate-rotate" />
            ) : (
              isUpdating?"Update":"Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductUpload;
