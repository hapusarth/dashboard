<script>
    import { Link } from "svelte-routing";

    export let items;
    export let idx;

    let activeAccordionItem = null;
    const toggleItem = (idx) => {
        activeAccordionItem = activeAccordionItem === idx ? null : idx;
    };
</script>

<div class="accordion__item" class:active={activeAccordionItem === idx}>
    <button on:click={() => toggleItem(idx)} class="accordion__item-trigger">
        <div class="accordion__item-title">
            {@html items.icon ?? ""}
            <p>{items.name}</p>

            {#if items?.children}
                <svg
                    width="12"
                    height="6"
                    style={activeAccordionItem == idx && "rotate: 180deg"}
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.5856 5.46849C11.3269 5.79194 10.8549 5.84438 10.5315 5.58562L5.99997 1.96044L1.46849 5.58562C1.14505 5.84438 0.673078 5.79194 0.414321 5.46849C0.155563 5.14505 0.208005 4.67308 0.531451 4.41432L5.53145 0.41432C5.80537 0.195189 6.19458 0.195189 6.46849 0.41432L11.4685 4.41432C11.7919 4.67308 11.8444 5.14505 11.5856 5.46849Z"
                        fill="black"
                    />
                </svg>
            {/if}
        </div>

        {#if items.icon && items.length > 1}
            <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.41438 8.03151C3.67313 7.70806 4.1451 7.65562 4.46855 7.91438L9.00003 11.5396L13.5315 7.91438C13.855 7.65562 14.3269 7.70806 14.5857 8.03151C14.8444 8.35495 14.792 8.82692 14.4685 9.08568L9.46855 13.0857C9.19463 13.3048 8.80542 13.3048 8.53151 13.0857L3.53151 9.08568C3.20806 8.82692 3.15562 8.35495 3.41438 8.03151Z"
                    fill="black"
                />
            </svg>
        {/if}
    </button>

    <div class="accordion__item-body">
        {#if items?.children?.length}
            <ul class="accordion__item-list">
                {#each items?.children as submenuItem}
                    <!-- todo: поменять to="response.pageId" -->
                    <li class="accordion__item-link">
                        <!-- <Link to="/main-project">{submenuItem.name}</Link> -->
                        <svelte:self
                            items={submenuItem}
                            idx={submenuItem.menu_id}
                        />
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    .accordion__item:not(:last-child) {
        margin-bottom: 15px;
    }

    .accordion__item.active .accordion__item-trigger > svg {
        transform: rotateZ(-180deg);
    }

    .accordion__item-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        margin-bottom: 10px;
        width: 100%;
    }

    .accordion__item-trigger > svg {
        display: none;
        flex-shrink: 0;
        transition: all 0.1s linear;
    }

    .accordion__item-title {
        display: flex;
        align-items: center;
        margin-right: 5px;
        gap: 20px;
        width: 100%;
    }
    .accordion__item-title p {
        display: none;
    }

    .accordion__item-title > svg {
        display: none;
        margin-left: auto;
    }
    .aside:hover .accordion__item-title p {
        display: block;
    }
    .aside:hover .accordion__item-title svg {
        display: block;
    }

    .accordion__item-body {
        display: grid;
        grid-template-rows: 0fr;
        font-size: 14px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        margin-left: 12px;
        transition: grid-template-rows 0.1s linear;
    }

    .accordion__item-list {
        overflow: hidden;
        margin-left: 50px;
    }

    :global(.aside:hover .accordion__item.active > .accordion__item-body) {
        grid-template-rows: 1fr;
    }

    .accordion__item-link:not(:last-child) {
        margin-bottom: 10px;
    }
</style>
