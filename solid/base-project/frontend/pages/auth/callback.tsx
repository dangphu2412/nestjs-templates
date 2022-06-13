import {useRouter} from "next/router";

export default function CallbackSAMLPage() {
    const router = useRouter();
    const { samlResponse } = router.query;
    return <>
        ...
    </>
}