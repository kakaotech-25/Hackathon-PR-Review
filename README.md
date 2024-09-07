## 소개

- 풀리퀘스트에 자동으로 코드리뷰를 달아주는 봇입니다. 😃
- claude sonet3.5 모델을 사용해서 코드리뷰에 특화되어있습니다.👍 
- 뱅크샐러드의 P:n 룰을 지정하여 리뷰의 강도를 표현합니다. ⭐️

## 사용법

### Step1. github secret
> 깃허브 시크릿에 claude api key를 변수로 등록합니다.
`ANTHROPIC_API_KEY`

### Step2. github permission
> settings/workflow 에서 레포지토리 코멘트 작성 권한을 아래와 같이 허용해주세요.

<details>
<summary>예시 이미지</summary>

![184130872-7e91445d-4287-4b80-8c3b-6ff40fc893db](https://github.com/user-attachments/assets/2585f96c-fe78-4c1b-adc5-7407e6e1ea13)

</details>

### Step3. github action
> 아래 스크립트를 복사해서 경로 안에 파일로 넣어주세요.
`.github/workflows/code-review.yaml`

## 
```yml
name: Pull Request Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  code-review:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20"

      - name: Pull Request Code Review Bot
        uses: kakaotech-25/Hackathon-PR-Review@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          api-key: ${{secrets.ANTHROPIC_API_KEY}}

      - name: Post Review Results
        run: |
          echo "Code review completed!"
```

## 추가 예정
- 유저 커스텀 프롬프팅
- 라벨을 통한 리뷰 on / off 기능
- gpt api 지원
- llama3.1 8b 무료 체험 버전
