document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANT: Replace with your own Kakao JavaScript Key
    Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');

    const birdData = {
        eagle: {
            name: '독수리',
            image: 'images/eagle.png',
            description: '당신은 타고난 리더십과 뛰어난 통찰력을 가진 독수리 같아요! 목표를 향해 거침없이 나아가며, 넓은 시야로 전체를 조망할 줄 아는 능력이 있습니다. 카리스마와 자신감으로 주변 사람들을 이끌지만, 때로는 너무 강해 보일 수 있으니 부드러운 모습을 보여주는 것도 좋아요.',
            bestMatch: '백조 (서로의 이상을 존중하며 함께 성장할 수 있는 관계)'
        },
        parrot: {
            name: '앵무새',
            image: 'images/parrot.png',
            description: '유쾌하고 사교적인 당신은 사람들에게 즐거움을 주는 앵무새 같아요! 뛰어난 언변과 재치로 주변 분위기를 밝게 만들고, 새로운 사람들과도 금방 친해지는 매력의 소유자입니다. 호기심이 많아 다방면에 관심이 많지만, 한 가지 일에 집중하는 꾸준함이 더해진다면 더욱 빛날 거예요.',
            bestMatch: '부엉이 (지적인 대화를 나누며 서로에게 영감을 줄 수 있는 사이)'
        },
        swan: {
            name: '백조',
            image: 'images/swan.png',
            description: '우아하고 섬세한 감성을 가진 당신은 아름다운 백조를 닮았어요. 겉으로는 차분하고 조용해 보이지만, 내면에는 깊은 예술적 감성과 다른 사람에 대한 따뜻한 공감 능력을 가지고 있습니다. 이상적인 관계를 꿈꾸며, 한번 마음을 준 상대에게는 깊은 애정을 보여줍니다.',
            bestMatch: '독수리 (당신의 잠재력을 알아보고 힘껏 지지해 줄 든든한 파트너)'
        },
        owl: {
            name: '부엉이',
            image: 'images/owl.png',
            description: '지혜롭고 신중한 당신은 밤의 현자, 부엉이 같아요. 조용한 환경에서 깊이 생각하고 탐구하는 것을 즐기며, 뛰어난 분석력으로 문제의 본질을 꿰뚫어 봅니다. 혼자만의 시간을 중요하게 생각하지만, 당신의 지혜를 필요로 하는 사람들에게는 훌륭한 조언자가 되어줍니다.',
            bestMatch: '앵무새 (당신에게 새로운 세상과 즐거움을 알려줄 유쾌한 친구)'
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const birdType = urlParams.get('bird') || 'owl'; // Default to owl if no param
    const result = birdData[birdType];

    document.getElementById('bird-name').innerText = result.name;
    document.getElementById('bird-image').src = result.image;
    document.getElementById('bird-description').innerText = result.description;
    document.getElementById('best-match').innerText = result.bestMatch;

    // Kakao Share
    document.getElementById('kakao-share-btn').addEventListener('click', () => {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: `나의 소울 버드는 '${result.name}'!`,
                description: result.description,
                imageUrl: window.location.origin + window.location.pathname.replace('results.html', '') + result.image,
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            buttons: [
                {
                    title: '나도 테스트하기',
                    link: {
                        mobileWebUrl: window.location.origin + window.location.pathname.replace('results.html', 'index.html'),
                        webUrl: window.location.origin + window.location.pathname.replace('results.html', 'index.html'),
                    },
                },
            ],
        });
    });

    // Save as Image
    document.getElementById('save-image-btn').addEventListener('click', () => {
        const resultBox = document.getElementById('result-box');
        html2canvas(resultBox, {
            useCORS: true, // For external images
            onrendered: function(canvas) { // Old syntax for html2canvas v0.5.0
                const link = document.createElement('a');
                link.download = '나의_소울_버드_결과.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        }).then(canvas => { // Modern syntax for html2canvas v1.0.0+
             const link = document.createElement('a');
             link.download = '나의_소울_버드_결과.png';
             link.href = canvas.toDataURL('image/png');
             link.click();
        });
    });
});